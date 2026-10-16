import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { CartContext } from "./CartContextObject";

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addItem = (menuItem, { quantity = 1, customizations = [] } = {}) => {
    const key = `${menuItem.id}-${customizations.map((c) => c.id).sort().join(",")}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          key,
          menu_item: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          quantity,
          customizations,
        },
      ];
    });
  };

  const updateQuantity = (key, quantity) => {
    if (quantity < 1) {
      toast.info("Minimum quantity is 1. Use the bin icon to remove an item.", { toastId: "min-quantity" });
      return;
    }
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, quantity } : i)));
  };

  const removeItem = (key) => {
    const target = items.find((i) => i.key === key);
    setItems((prev) => prev.filter((i) => i.key !== key));
    toast.info(`${target?.name || "Item"} removed from your cart.`);
  };

  const clearCart = () => setItems([]);

  const { totalItems, totalPrice } = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        const lineTotal =
          (Number(item.price) + item.customizations.reduce((s, c) => s + Number(c.price || 0), 0)) *
          item.quantity;
        return {
          totalItems: acc.totalItems + item.quantity,
          totalPrice: acc.totalPrice + lineTotal,
        };
      },
      { totalItems: 0, totalPrice: 0 }
    );
  }, [items]);

  const toOrderPayload = () =>
    items.map((i) => ({
      menu_item: i.menu_item,
      quantity: i.quantity,
      customizations: i.customizations.map((c) => c.id),
    }));

  const value = {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
    toOrderPayload,
    isCartOpen,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
