import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import { createReservation, NO_TABLE_MESSAGE } from "../services/reservationService";
import ReservationTicket from "../components/fun/ReservationTicket";
import ScribbleUnderline from "../components/fun/ScribbleUnderline";
import DoodleDivider from "../components/fun/DoodleDivider";
import { celebrate } from "../utils/celebrate";
import { haptic } from "../utils/motion";

const EMPTY_FORM = { date: "", time: "", guests: 2, specialRequest: "" };
const MIN_GUESTS = 1;
const MAX_GUESTS = 8;

const TIME_SLOTS = Array.from({ length: 22 }, (_, index) => {
  const minutes = 12 * 60 + index * 30;
  const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
  return `${hours}:${minutes % 60 === 0 ? "00" : "30"}`;
});

const slotLabel = (slot) => {
  const [hours, minutes] = slot.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  return `${((hours + 11) % 12) + 1}:${String(minutes).padStart(2, "0")} ${suffix}`;
};

const toLocalISODate = (date) => {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().split("T")[0];
};

const labelClass = "mb-2 block text-xs font-medium uppercase tracking-wider text-ink/80";
const fieldClass =
  "w-full rounded border border-[#C5A059]/30 bg-paper px-4 py-2.5 text-sm text-ink focus:border-[#C5A059] focus:outline-none";

const MiniGlass = () => (
  <svg width="14" height="18" viewBox="0 0 64 77" aria-hidden="true" className="text-gold-deep">
    <path
      d="M12 6h40l-4 58a6 6 0 0 1-6 5.5H22A6 6 0 0 1 16 64z"
      fill="currentColor"
      fillOpacity="0.25"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinejoin="round"
    />
  </svg>
);

export default function BookTable() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const today = useMemo(() => toLocalISODate(new Date()), []);

  const isPastSlot = (slot) =>
    formData.date === today && new Date(`${today}T${slot}`).getTime() < new Date().getTime();

  const handleDateChange = (event) => {
    const date = event.target.value;
    setFormData((prev) => {
      const stillValid =
        prev.time && !(date === today && new Date(`${today}T${prev.time}`).getTime() < Date.now());
      return { ...prev, date, time: stillValid ? prev.time : "" };
    });
  };

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const changeGuests = (delta) => {
    haptic(8);
    setFormData((prev) => ({
      ...prev,
      guests: Math.min(MAX_GUESTS, Math.max(MIN_GUESTS, Number(prev.guests) + delta)),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isAuthenticated) {
      toast.info("Please log in or register to reserve a table.", { toastId: "reservation-login" });
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (!formData.date || !formData.time) {
      toast.error("Please pick a date and a time slot.");
      return;
    }

    if (new Date(`${formData.date}T${formData.time}`).getTime() < Date.now()) {
      toast.error("Please choose a date and time in the future.");
      return;
    }

    setLoading(true);

    try {
      const created = await createReservation({
        date: formData.date,
        time: formData.time,
        guests: Number(formData.guests),
        specialRequest: formData.specialRequest,
      });

      toast.success("Reservation created! We'll confirm it shortly.");
      celebrate();
      setConfirmation({
        id: created?.id,
        date: created?.reservation_date || formData.date,
        time: created?.reservation_time || formData.time,
        guests: created?.number_of_guests || formData.guests,
      });
      setFormData(EMPTY_FORM);
    } catch (error) {
      toast.error(
        error.message === NO_TABLE_MESSAGE
          ? "No table available for the selected date and time."
          : error.message || "Failed to book table."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center bg-paper px-4 py-16 text-ink">
      <div className="washi mt-12 w-full max-w-lg rounded-sm border border-gold/30 bg-paper-2 p-6 shadow-xl sm:mt-16 sm:p-8">
        <p className="text-center text-[10px] font-medium uppercase tracking-[0.35em] text-gold-deep sm:text-xs">
          Reservations
        </p>
        <h2 className="mb-3 mt-2 text-center font-serif text-3xl font-medium text-ink sm:text-4xl">
          <ScribbleUnderline>Reserve a Table</ScribbleUnderline>
        </h2>
        <p className="mb-5 text-center text-xs text-ink/70">Join us for an unforgettable dining experience.</p>
        <DoodleDivider className="mb-6" />

        {confirmation ? (
          <ReservationTicket
            reservation={confirmation}
            onView={() => navigate("/my-orders", { state: { tab: "reservations" } })}
            onAnother={() => setConfirmation(null)}
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="date" className={labelClass}>
                Date
              </label>
              <input
                id="date"
                type="date"
                name="date"
                min={today}
                required
                value={formData.date}
                onChange={handleDateChange}
                className={fieldClass}
              />
            </div>

            <fieldset>
              <legend className={labelClass}>Time</legend>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {TIME_SLOTS.map((slot) => {
                  const past = isPastSlot(slot);
                  const selected = formData.time === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={past}
                      aria-pressed={selected}
                      onClick={() => setFormData((prev) => ({ ...prev, time: slot }))}
                      className={`rounded-sm border px-1 py-2 text-xs font-medium transition-colors ${
                        selected
                          ? "border-gold bg-gold text-[#2C2523]"
                          : "border-gold/30 text-ink hover:border-gold"
                      } disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-gold/30`}
                    >
                      {slotLabel(slot)}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <span className={labelClass}>Guests</span>
              <div className="flex items-center justify-between gap-4 rounded border border-gold/30 bg-paper px-4 py-3">
                <button
                  type="button"
                  onClick={() => changeGuests(-1)}
                  disabled={formData.guests <= MIN_GUESTS}
                  aria-label="Fewer guests"
                  className="rounded-full border border-gold/40 p-2 text-ink hover:bg-gold hover:text-[#2C2523] disabled:opacity-30"
                >
                  <FiMinus />
                </button>
                <div className="text-center">
                  <p className="font-serif text-2xl font-bold" aria-live="polite">
                    {formData.guests} {Number(formData.guests) === 1 ? "guest" : "guests"}
                  </p>
                  <div className="mt-1 flex justify-center gap-1" aria-hidden="true">
                    {Array.from({ length: Number(formData.guests) }, (_, index) => (
                      <MiniGlass key={index} />
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => changeGuests(1)}
                  disabled={formData.guests >= MAX_GUESTS}
                  aria-label="More guests"
                  className="rounded-full border border-gold/40 p-2 text-ink hover:bg-gold hover:text-[#2C2523] disabled:opacity-30"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="specialRequest" className={labelClass}>
                Special Requests (Optional)
              </label>
              <textarea
                id="specialRequest"
                name="specialRequest"
                rows="3"
                value={formData.specialRequest}
                onChange={handleChange}
                placeholder="Allergies, seating preferences, birthdays..."
                className={fieldClass}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-[#8a6a30] py-3 text-sm font-medium tracking-wide text-white transition-colors duration-200 hover:bg-[#6e5425] disabled:opacity-50"
            >
              {loading ? "Confirming..." : "Confirm Reservation"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
