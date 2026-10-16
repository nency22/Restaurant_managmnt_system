import apiClient from "./apiClient";

const toList = (data) => (Array.isArray(data) ? data : data?.results || []);

export const createOrder = async (cartItems) => {
  const items = (cartItems || []).map((item) => ({
    menu_item: item.menu_item || item.id,
    quantity: Number(item.quantity || 1),
    customizations: Array.isArray(item.customizations)
      ? item.customizations.map((c) => (typeof c === "object" ? c.id : c))
      : [],
  }));
  const { data } = await apiClient.post("/api/create-order/", { items });
  return data;
};

export const getMyOrders = async () => {
  const { data } = await apiClient.get("/api/my-orders/");
  return toList(data);
};

export const cancelOrder = async (orderId) => {
  const { data } = await apiClient.post(`/api/${orderId}/cancel/`);
  return data;
};
