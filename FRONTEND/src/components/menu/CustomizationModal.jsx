import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiMinus, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { flyToCart } from "../../utils/flyToCart";
import { haptic } from "../../utils/motion";

import { useCart } from "../../hooks/useCart";

const CustomizationModal = ({ item, customizations = [], loading = false, onClose }) => {
  const { addItem } = useCart();
  const [selected, setSelected] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const toggleCustomization = (option) => {
    setSelected((prev) => {
      const exists = prev.some((o) => (o.id || o._id) === (option.id || option._id));
      if (exists) {
        return prev.filter((o) => (o.id || o._id) !== (option.id || option._id));
      }
      return [...prev, option];
    });
  };

  const totalPrice = useMemo(() => {
    const basePrice = Number(item?.price || 0);
    const extrasPrice = selected.reduce((sum, opt) => sum + Number(opt.price || 0), 0);
    return (basePrice + extrasPrice) * quantity;
  }, [item?.price, selected, quantity]);

  const handleAdd = (event) => {
    addItem(item, { quantity, customizations: selected });
    flyToCart(event.currentTarget);
    haptic();
    toast.success(`${item?.name || "Item"} is in your cart. Good choice!`);
    onClose();
  };

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center p-0 sm:p-4"
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md rounded-t-xl sm:rounded-xl bg-paper p-5 sm:p-6 shadow-2xl border border-gold-deep/20"
        >
          <div className="flex items-start justify-between border-b border-ink/10 pb-3">
            <div>
              <h3 className="font-['Playfair_Display'] text-lg sm:text-xl font-bold text-ink">
                {item.name}
              </h3>
              <p className="mt-0.5 font-['Playfair_Display'] text-sm font-semibold text-gold-deep">
                ₹{Number(item.price || 0).toFixed(0)}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="rounded-full p-1 text-ink/60 hover:bg-[#3d3122]/10 hover:text-ink transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>

          {item.description && (
            <p className="mt-3 font-['Montserrat'] text-xs leading-relaxed text-ink/70">
              {item.description}
            </p>
          )}

          <div className="mt-4 max-h-52 overflow-y-auto pr-1">
            {loading ? (
              <div className="py-4 text-center">
                <p className="font-['Montserrat'] text-xs text-ink/50 animate-pulse">
                  Loading customization options...
                </p>
              </div>
            ) : customizations.length > 0 ? (
              <>
                <p className="font-['Montserrat'] text-[10px] font-bold uppercase tracking-widest text-gold-deep">
                  Select Options
                </p>
                <ul className="mt-2 space-y-2">
                  {customizations.map((option) => {
                    const optId = option.id || option._id;
                    const isChecked = selected.some((o) => (o.id || o._id) === optId);

                    return (
                      <li key={optId}>
                        <label className="flex cursor-pointer items-center justify-between rounded-md border border-gold-deep/30 bg-paper-2/60 px-3 py-2 text-xs transition-colors hover:bg-paper-2">
                          <span className="flex items-center gap-2.5 font-['Montserrat'] text-ink">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleCustomization(option)}
                              className="h-4 w-4 rounded accent-gold-deep cursor-pointer"
                            />
                            {option.name}
                          </span>
                          {Number(option.price) > 0 && (
                            <span className="font-['Playfair_Display'] font-bold text-gold-deep">
                              +₹{Number(option.price).toFixed(0)}
                            </span>
                          )}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <p className="font-['Montserrat'] text-xs italic text-ink/50 py-1">
                No extra customizations available for this dish.
              </p>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4">
            <div className="flex items-center gap-3 rounded-full border border-gold-deep/40 bg-paper-2/40 px-3 py-1.5">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="text-ink hover:text-gold-deep transition-colors"
              >
                <FiMinus size={14} />
              </button>
              <span className="w-5 text-center font-['Montserrat'] text-xs font-bold text-ink">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="text-ink hover:text-gold-deep transition-colors"
              >
                <FiPlus size={14} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex items-center gap-2 rounded-md bg-[#2B2319] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF4E5] shadow-md transition-all hover:bg-[#8C6D3B]"
            >
              Add to Cart • ₹{totalPrice.toFixed(0)}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CustomizationModal;
