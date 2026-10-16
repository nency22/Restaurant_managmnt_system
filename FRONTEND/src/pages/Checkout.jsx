import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import { useCart } from "../hooks/useCart";
import { createOrder } from "../services/orderService";
import { EmptyState } from "../components/feedback/StateViews";
import { formatPrice, lineTotal } from "../utils/format";
import ScribbleUnderline from "../components/fun/ScribbleUnderline";
import { celebrate } from "../utils/celebrate";

const Checkout = () => {
  const { items, totalPrice, toOrderPayload, clearCart } = useCart();
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      await createOrder(toOrderPayload());

      toast.success("Order placed successfully! The kitchen is on it.");
      celebrate();
      clearCart();
      navigate("/my-orders");
    } catch (error) {
      toast.error(error.message || "Couldn't place your order — please try again.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <main className="w-full overflow-x-hidden bg-paper px-5 pt-32 pb-20 text-ink sm:px-8 sm:pt-40 md:px-12 lg:px-16">
      <div className="mx-auto w-full max-w-2xl">
        <p className="text-center text-[10px] font-medium uppercase tracking-[0.35em] text-[#C5A059] sm:text-xs">
          Checkout
        </p>
        <h1 className="mt-3 text-center font-serif text-3xl font-medium sm:text-4xl">
          <ScribbleUnderline>Review Your Order</ScribbleUnderline>
        </h1>

        {items.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="Your cart is empty"
              message="Add something from the menu before checking out."
            />
            <div className="mt-6 text-center">
              <NavLink to="/menu" className="text-sm font-medium text-[#C5A059] hover:underline">
                Browse the menu →
              </NavLink>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-10 space-y-4">
              {items.map((item) => (
                <div
                  key={item.key || item.id}
                  className="flex items-start justify-between rounded-sm border border-[#C5A059]/20 bg-paper-2 p-4"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {item.quantity}× {item.name}
                    </p>
                    {item.customizations && item.customizations.length > 0 && (
                      <p className="mt-1 text-xs text-ink/60">
                        {item.customizations
                          .map((c) => (typeof c === "object" ? c.name : c))
                          .join(", ")}
                      </p>
                    )}
                  </div>
                  <span className="font-mono text-sm text-[#C5A059]">
                    {formatPrice(lineTotal(item))}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#C5A059]/25 pt-5 text-base font-medium">
              <span>Total</span>
              <span className="font-mono text-[#C5A059]">{formatPrice(totalPrice)}</span>
            </div>

            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={placing}
              className="mt-8 w-full bg-[#C5A059] py-4 text-xs font-semibold uppercase tracking-widest text-[#2C2523] transition-all duration-300 hover:bg-[#b89450] disabled:opacity-60"
            >
              {placing ? "Placing order..." : "Place Order"}
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default Checkout;
