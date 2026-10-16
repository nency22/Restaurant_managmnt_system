import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiX, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCart } from "../../hooks/useCart";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { haptic } from "../../utils/motion";
import { formatPrice, lineTotal } from "../../utils/format";

const CartDrawer = () => {
  const { items, updateQuantity, removeItem, totalPrice, isCartOpen, closeCart } = useCart();
  const requireAuth = useRequireAuth();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            aria-hidden="true"
            className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0, right: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100 || info.velocity.x > 500) {
                haptic(10);
                closeCart();
              }
            }}
            aria-label="Cart"
            className="fixed inset-y-0 right-0 z-[90] flex h-dvh w-[88%] max-w-md flex-col bg-paper px-6 py-6 text-ink shadow-2xl sm:w-[420px]"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-[#C5A059]/25 pb-4">
              <h2 className="font-serif text-xl">Your Cart</h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="p-1 text-xl text-ink hover:opacity-70"
              >
                <FiX />
              </button>
            </div>

            <div className="mt-4 flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <p className="mt-10 text-center text-sm text-ink/60">
                  Your table is looking a bit empty. Add something tasty from the menu.
                </p>
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => (
                    <li key={item.key} className="rounded-sm bg-paper-2 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{item.name}</p>
                          {item.customizations.length > 0 && (
                            <p className="mt-0.5 text-xs text-ink/60">
                              {item.customizations.map((c) => c.name).join(", ")}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.key)}
                          aria-label={`Remove ${item.name}`}
                          className="shrink-0 text-ink/40 hover:text-red-500"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-3 rounded-full border border-[#C5A059]/40 px-2 py-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.key, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="text-ink hover:text-[#C5A059]"
                          >
                            <FiMinus size={13} />
                          </button>
                          <span className="w-4 text-center text-sm">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.key, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="text-ink hover:text-[#C5A059]"
                          >
                            <FiPlus size={13} />
                          </button>
                        </div>
                        <span className="font-mono text-sm text-[#C5A059]">
                          {formatPrice(lineTotal(item))}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="mt-4 shrink-0 border-t border-[#C5A059]/25 pt-4">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>Total</span>
                  <span className="font-mono text-[#C5A059]">{formatPrice(totalPrice)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    requireAuth(() => {
                      closeCart();
                      navigate("/checkout");
                    });
                  }}
                  className="mt-4 block w-full rounded-sm bg-[#C5A059] py-3 text-center text-xs font-semibold uppercase tracking-widest text-[#2C2523] transition-colors hover:bg-[#b89450]"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
