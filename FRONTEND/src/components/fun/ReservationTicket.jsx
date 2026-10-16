import { formatTime } from "../../utils/format";
import Stamp from "./Stamp";

const formatDate = (value) => {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", year: "numeric" });
};

export default function ReservationTicket({ reservation, onView, onAnother }) {
  return (
    <div>
      <div className="relative mx-auto max-w-sm rounded-md border border-gold/50 bg-paper text-ink shadow-xl">
        <div className="p-6 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-gold-deep">Table reserved</p>
          <h3 className="mt-1 font-['Great_Vibes'] text-4xl">Whiskey & Wheat</h3>

          <dl className="mt-5 grid grid-cols-2 gap-4 text-left">
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-ink/50">Date</dt>
              <dd className="mt-0.5 text-sm font-semibold">{formatDate(reservation.date)}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-ink/50">Time</dt>
              <dd className="mt-0.5 text-sm font-semibold">{formatTime(reservation.time)}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-ink/50">Guests</dt>
              <dd className="mt-0.5 text-sm font-semibold">{reservation.guests}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-ink/50">Booking</dt>
              <dd className="mt-0.5 text-sm font-semibold">{reservation.id ? `#${reservation.id}` : "Pending"}</dd>
            </div>
          </dl>
        </div>

        <div className="relative">
          <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full border border-gold/50 bg-paper-2" />
          <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full border border-gold/50 bg-paper-2" />
          <div className="border-t-2 border-dashed border-gold/40" />
        </div>

        <div className="flex items-center justify-center gap-3 p-4">
          <Stamp tone="gold" className="text-[10px]">Pending</Stamp>
          <span className="text-xs text-ink/70">We'll confirm shortly.</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onView}
          className="flex-1 rounded-sm bg-gold-deep px-5 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand"
        >
          View my reservations
        </button>
        <button
          type="button"
          onClick={onAnother}
          className="flex-1 rounded-sm border border-gold px-5 py-3 text-sm font-medium tracking-wide text-ink transition-colors hover:bg-gold hover:text-[#2C2523]"
        >
          Book another
        </button>
      </div>
    </div>
  );
}
