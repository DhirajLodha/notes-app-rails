export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "G"; // Default to 'G' for "Guest User"
  const words = name.trim().split(" ");
  const initials = words
    .map((word) => word.charAt(0).toUpperCase()) // Ensure uppercase
    .join("");

  return initials;
};

export const formatDate = (isoString) => {
  if (!isoString) return ""; // Handle empty/null input

  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "short" }); // "Apr"
  const year = date.getFullYear();

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};