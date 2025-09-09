export const statuses = ["Todo", "In Progress", "Done"];

export const getStatusColor = (status) => {
  switch (status) {
    case "Done":
      return "success";
    case "In Progress":
      return "warning";
    default:
      return "default";
  }
};

// Formats a date-like value to dd-mm-yyyy without changing the stored value format.
// Accepts values like "YYYY-MM-DD", Date, or ISO timestamp.
export const formatDateDMY = (value) => {
  if (!value) return "";
  if (typeof value === "string") {
    // Handle plain YYYY-MM-DD from native date input
    const simpleMatch = value.match(/^\d{4}-\d{2}-\d{2}$/);
    if (simpleMatch) {
      const [y, m, d] = value.split("-");
      return `${d}-${m}-${y}`;
    }
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};
