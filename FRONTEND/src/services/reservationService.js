import apiClient from "./apiClient";

export const NO_TABLE_MESSAGE = "No table available";

const toList = (data) => (Array.isArray(data) ? data : data?.results || []);

const toTime = (value = "") => (value.split(":").length === 2 ? `${value}:00` : value);

const looksLikeNoTable = (error) =>
  error?.status === 409 ||
  /no table|not available|unavailable|fully booked/i.test(error?.message || "");

export const createReservation = async (reservation) => {
  const payload = {
    reservation_date: reservation.date || reservation.reservation_date,
    reservation_time: toTime(reservation.time || reservation.reservation_time),
    number_of_guests: Number(reservation.guests || reservation.number_of_guests || 1),
    special_request: reservation.specialRequest || reservation.special_request || "",
  };

  try {
    const { data } = await apiClient.post("http://127.0.0.1:8000/api/reservations/", payload);
    return data;
  } catch (error) {
    if (looksLikeNoTable(error)) {
      const noTable = new Error(NO_TABLE_MESSAGE);
      noTable.status = error.status;
      throw noTable;
    }
    throw error;
  }
};

export const getMyReservations = async () => {
  const { data } = await apiClient.get("http://127.0.0.1:8000/api/reservations/my/");
  return toList(data);
};

export const cancelReservation = async (id) => {
  const { data } = await apiClient.patch(`http://127.0.0.1:8000/api/reservations/${id}/cancel/`);
  return data;
};

export const getAdminReservations = async () => {
  const { data } = await apiClient.get("http://127.0.0.1:8000/api/admin/reservations/");
  return toList(data);
};

export const updateReservationStatus = async (id, status) => {
  const { data } = await apiClient.patch(`http://127.0.0.1:8000/api/admin/reservations/${id}/status/`, { status });
  return data;
};
