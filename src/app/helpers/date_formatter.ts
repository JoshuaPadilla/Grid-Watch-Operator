export const formatDate = (dateString: string | Date) => {
  if (!dateString) return "";
  try {
    // Use Intl.DateTimeFormat for a cleaner local date/time display
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(dateString));
  } catch (e) {
    return dateString;
  }
};
