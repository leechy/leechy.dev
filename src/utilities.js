const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Otober",
  "November",
  "December"
];

export function formatDate(date) {
  const dt = new Date(date);
  return (
    monthNames[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear()
  );
}
