const isSelected = (day, value) => {
  return value.isSame(day, "day");
};

const beforeToday = (day) => {
  return day.isBefore(new Date(), "day");
};

const isToday = (day) => {
  return day.isSame(new Date(), "day");
};

const dayStyles = (day, value) => {
  if (beforeToday(day)) return "Before";
  if (isSelected(day, value)) return "Selected";
  if (isToday(day)) return "Today";
  return "";
};

export default dayStyles;
