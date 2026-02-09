function formatDate(date, showTime = false) {
  if (!date) return "";

  // Fix Laravel datetime format: "2026-02-10 02:33:59" -> "2026-02-10T02:33:59"
  const d = new Date(date.replace(" ", "T"));

  const day = d.getDate();
  const daySuffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  const month = d.toLocaleString("default", { month: "long" });
  const year = d.getFullYear();

  let formatted = `${day}${daySuffix} ${month}, ${year}`;

  if (showTime) {
    const time = d.toLocaleTimeString("default", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    formatted += ` | ${time}`;
  }

  return formatted;
}

export default formatDate;
