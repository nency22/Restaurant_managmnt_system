import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { getAdminReservations, updateReservationStatus } from "../services/reservationService";

const FILTERS = ["ALL", "PENDING", "CONFIRMED", "COMPLETED", "REJECTED", "CANCELLED"];
const ACTIONS = [
  ["CONFIRMED", "Confirm"],
  ["REJECTED", "Reject"],
  ["COMPLETED", "Complete"],
];

const badgeStyles = {
  CONFIRMED: "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
  COMPLETED: "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-300",
  REJECTED: "border-red-300 bg-red-50 text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300",
  CANCELLED: "border-red-300 bg-red-50 text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300",
  PENDING: "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
};

export default function AdminReservations() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [busy, setBusy] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setRows(await getAdminReservations());
    } catch (error) {
      toast.error(error.message || "Failed to load reservations.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    getAdminReservations()
      .then((data) => {
        if (active) setRows(data);
      })
      .catch((error) => toast.error(error.message || "Failed to load reservations."))
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const changeStatus = async (id, status) => {
    setBusy(`${id}-${status}`);
    try {
      await updateReservationStatus(id, status);
      setRows((prev) => prev.map((row) => (row.id === id ? { ...row, status } : row)));
      toast.success(`Reservation #${id} marked ${status.toLowerCase()}.`);
    } catch (error) {
      toast.error(error.message || "Couldn't update the reservation status.");
    } finally {
      setBusy(null);
    }
  };

  const visible = useMemo(
    () => (filter === "ALL" ? rows : rows.filter((row) => String(row.status).toUpperCase() === filter)),
    [rows, filter]
  );

  return (
    <div className="min-h-screen bg-paper px-4 py-12 text-ink sm:px-6">
      <div className="mx-auto max-w-5xl pt-20">
        <h1 className="font-serif text-2xl font-bold sm:text-3xl">Manage Reservations</h1>
        <p className="mb-6 mt-1 text-sm text-ink/70">Review booking requests and update their status.</p>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          {FILTERS.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setFilter(name)}
              aria-pressed={filter === name}
              className={`rounded-sm border px-3 py-1 text-[11px] uppercase tracking-wider transition-colors ${
                filter === name
                  ? "border-gold bg-gold text-[#2C2523]"
                  : "border-ink/20 text-ink/70 hover:border-gold hover:text-ink"
              }`}
            >
              {name}
            </button>
          ))}
          <button type="button" onClick={load} disabled={loading} className="ml-auto text-xs underline disabled:opacity-40">
            Refresh
          </button>
        </div>

        {loading ? (
          <div role="status" className="flex items-center justify-center gap-3 py-16 text-ink/60">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
            Loading reservations...
          </div>
        ) : visible.length === 0 ? (
          <p className="rounded-sm border border-gold/25 bg-paper-2 p-8 text-center text-ink/70">No reservations found.</p>
        ) : (
          <div className="space-y-3">
            {visible.map((row) => {
              const status = String(row.status || "PENDING").toUpperCase();
              return (
                <div
                  key={row.id}
                  className="flex flex-col gap-4 rounded-sm border border-gold/25 bg-paper-2 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-semibold">
                        #{row.id} · {row.user}
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                          badgeStyles[status] || badgeStyles.PENDING
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-ink/70">
                      {row.reservation_date} · {String(row.reservation_time || "").slice(0, 5)} · {row.number_of_guests} guests
                      {row.table_number ? ` · Table ${row.table_number}` : ""}
                    </p>
                    {row.special_request && <p className="mt-1 text-xs text-ink/60">“{row.special_request}”</p>}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {ACTIONS.map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        disabled={status === value || busy === `${row.id}-${value}`}
                        onClick={() => changeStatus(row.id, value)}
                        className="rounded-sm border border-gold px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:bg-gold hover:text-[#2C2523] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
                      >
                        {busy === `${row.id}-${value}` ? "..." : label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
