import { useCallback, useEffect, useState } from "react";
import { getMenuItems, peekMenuItems } from "../services/menuService";

const normalize = (data) => {
  const list = Array.isArray(data) ? data : data?.results;
  if (!Array.isArray(list)) throw new Error("Invalid menu data received from the server.");
  return list;
};

export const useMenu = ({ onError } = {}) => {
  const [cached] = useState(peekMenuItems);
  const [items, setItems] = useState(() => (cached ? normalize(cached.data) : null));
  const [status, setStatus] = useState(cached ? "success" : "loading");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const request = useCallback(
    (force) =>
      getMenuItems({ force })
        .then((data) => {
          const list = normalize(data);
          setItems(list);
          setStatus(list.length === 0 ? "empty" : "success");
        })
        .catch((error) => {
          setStatus((prev) => (prev === "success" ? prev : "error"));
          onError?.(error);
        })
        .finally(() => setIsRefreshing(false)),
    [onError]
  );

  useEffect(() => {
    if (cached?.isFresh) return undefined;
    let active = true;
    getMenuItems()
      .then((data) => {
        if (!active) return;
        const list = normalize(data);
        setItems(list);
        setStatus(list.length === 0 ? "empty" : "success");
      })
      .catch((error) => {
        if (!active) return;
        setStatus((prev) => (prev === "success" ? prev : "error"));
        onError?.(error);
      });
    return () => {
      active = false;
    };
  }, [cached, onError]);

  const refetch = useCallback(() => {
    setStatus((prev) => (prev === "success" ? prev : "loading"));
    setIsRefreshing(true);
    request(true);
  }, [request]);

  return { items, status, isRefreshing, refetch };
};
