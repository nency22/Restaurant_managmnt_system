import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getMyReservations, cancelReservation } from "../services/reservationService";
import { getMyOrders, cancelOrder } from "../services/orderService";
import { formatPrice, formatTime } from "../utils/format";
import StatusTimeline from "../components/fun/StatusTimeline";
import StampCard from "../components/fun/StampCard";
import ScribbleUnderline from "../components/fun/ScribbleUnderline";

export default function MyOrders() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.tab === "reservations" ? "reservations" : "orders"
  );
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyKey, setBusyKey] = useState(null);

  useEffect(() => {
    let active = true;
    Promise.allSettled([getMyOrders(), getMyReservations()]).then(([ordersRes, reservationsRes]) => {
      if (!active) return;
      if (ordersRes.status === "fulfilled") setOrders(ordersRes.value);
      else toast.error(ordersRes.reason?.message || "Failed to load food orders.");
      if (reservationsRes.status === "fulfilled") setReservations(reservationsRes.value);
      else toast.error(reservationsRes.reason?.message || "Failed to load reservations.");
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const markCancelled = (setter, id) =>
    setter((prev) => prev.map((item) => (item.id === id ? { ...item, status: "CANCELLED" } : item)));

  const handleCancelReservation = async (id) => {
    setBusyKey(`reservation-${id}`);
    try {
      await cancelReservation(id);
      toast.success("Reservation cancelled successfully.");
      markCancelled(setReservations, id);
    } catch (error) {
      toast.error(error.message || "Reservation cancellation failed.");
    } finally {
      setBusyKey(null);
    }
  };

  const handleCancelOrder = async (id) => {
    setBusyKey(`order-${id}`);
    try {
      await cancelOrder(id);
      toast.success("Order cancelled successfully.");
      markCancelled(setOrders, id);
    } catch (error) {
      toast.error(error.message || "Order cancellation failed.");
    } finally {
      setBusyKey(null);
    }
  };

  const completedCount =
    [...orders, ...reservations].filter((entry) =>
      ["COMPLETED", "DELIVERED"].includes(String(entry.status || "").toUpperCase())
    ).length;

  const canCancel = (status) => ["PENDING", "CONFIRMED"].includes(String(status || "PENDING").toUpperCase());

  return (
    <div className="min-h-screen bg-paper px-6 py-12 text-ink">
      <div className="mx-auto max-w-4xl pt-20">
        <h1 className="font-serif text-3xl font-bold text-[#C5A059] mb-2">
          <ScribbleUnderline>My Orders & Reservations</ScribbleUnderline>
        </h1>
        <p className="text-sm text-ink/70 mb-6">
          Manage your upcoming table bookings and food order history.
        </p>

        {!loading && <StampCard completed={completedCount} />}

        <div className="flex border-b border-[#C5A059]/30 mb-8">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 px-4 text-xs uppercase tracking-widest font-semibold transition-colors ${
              activeTab === "orders"
                ? "border-b-2 border-[#C5A059] text-[#C5A059]"
                : "text-ink/60 hover:text-ink"
            }`}
          >
            Food Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("reservations")}
            className={`pb-3 px-4 text-xs uppercase tracking-widest font-semibold transition-colors ${
              activeTab === "reservations"
                ? "border-b-2 border-[#C5A059] text-[#C5A059]"
                : "text-ink/60 hover:text-ink"
            }`}
          >
            Table Reservations ({reservations.length})
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-ink/50">Loading your history...</div>
        ) : activeTab === "orders" ? (
          orders.length === 0 ? (
            <div className="rounded-sm border border-[#C5A059]/20 bg-paper-2 p-8 text-center text-ink/70">
              No food orders found.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-4 rounded-sm border border-[#C5A059]/20 bg-paper-2 p-5 transition-colors hover:border-[#C5A059]/40"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-ink">
                        Order #{item.id}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded ${
                          item.status === "COMPLETED" || item.status === "DELIVERED"
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                            : item.status === "CANCELLED"
                            ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-300 border border-red-200 dark:border-red-900"
                            : "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                        }`}
                      >
                        {item.status || "PENDING"}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-ink/70">
                      Total:{" "}
                      <span className="text-ink font-medium">
                        {formatPrice(item.total_price || item.total)}
                      </span>
                    </p>
                  </div>

                  {canCancel(item.status) && (
                    <button
                      disabled={busyKey === `order-${item.id}`}
                      onClick={() => handleCancelOrder(item.id)}
                      className="text-xs text-red-600 dark:text-red-300 hover:text-red-700 dark:hover:text-red-200 border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-950/70 disabled:opacity-50 px-3 py-1.5 rounded transition-colors"
                    >
                      {busyKey === `order-${item.id}` ? "Cancelling..." : "Cancel Order"}
                    </button>
                  )}
                  <StatusTimeline status={item.status} />
                </div>
              ))}
            </div>
          )
        ) : (
          reservations.length === 0 ? (
            <div className="rounded-sm border border-[#C5A059]/20 bg-paper-2 p-8 text-center text-ink/70">
              No active reservations found.
            </div>
          ) : (
            <div className="space-y-4">
              {reservations.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-4 rounded-sm border border-[#C5A059]/20 bg-paper-2 p-5 transition-colors hover:border-[#C5A059]/40"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-ink">
                        Reservation #{item.id}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded ${
                          item.status === "CONFIRMED"
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                            : item.status === "CANCELLED"
                            ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-300 border border-red-200 dark:border-red-900"
                            : "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                        }`}
                      >
                        {item.status || "PENDING"}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-ink/70">
                      Date:{" "}
                      <span className="text-ink font-medium">
                        {item.reservation_date || item.date || "N/A"}
                      </span>{" "}
                      | Time:{" "}
                      <span className="text-ink font-medium">
                        {formatTime(item.reservation_time || item.time)}
                      </span>{" "}
                      | Guests:{" "}
                      <span className="text-ink font-medium">
                        {item.number_of_guests || item.guests || item.guestCount || "N/A"}
                      </span>
                    </p>
                  </div>

                  {canCancel(item.status) && (
                    <button
                      disabled={busyKey === `reservation-${item.id}`}
                      onClick={() => handleCancelReservation(item.id)}
                      className="text-xs text-red-600 dark:text-red-300 hover:text-red-700 dark:hover:text-red-200 border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-950/70 disabled:opacity-50 px-3 py-1.5 rounded transition-colors"
                    >
                      {busyKey === `reservation-${item.id}` ? "Cancelling..." : "Cancel Reservation"}
                    </button>
                  )}
                  <StatusTimeline status={item.status} />
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
