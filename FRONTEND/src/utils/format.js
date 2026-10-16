export const formatPrice = (value) => `₹${Number(value || 0).toFixed(0)}`;

export const formatTime = (value) => String(value || "").slice(0, 5) || "N/A";

export const lineTotal = (item) => {
  const extras = (item.customizations || []).reduce(
    (sum, option) => sum + Number((typeof option === "object" ? option.price : 0) || 0),
    0
  );
  return (Number(item.price || 0) + extras) * Number(item.quantity || 1);
};
