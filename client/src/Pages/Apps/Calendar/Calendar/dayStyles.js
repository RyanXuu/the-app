import { calendarStyles } from "./index.js";

const dayStyles = (day) => {
  const todaysDate = new Date().getDate();
  const todaysMonth = new Date().getMonth() + 1;
  const todaysYear = new Date().getFullYear();

  const date = parseInt(day.date);
  const month = parseInt(day.month);
  const year = parseInt(day.year);

  if (year < todaysYear) return "before";
  if (year > todaysYear) return "after";

  if (month < todaysMonth) return "before";
  if (month > todaysMonth) return "after";

  if (date < todaysDate) return "before";
  if (date == todaysDate) return "today";
  if (date > todaysDate) return "after";
  return "";
};

export default dayStyles;
