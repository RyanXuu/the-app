import { React } from "./index";

const CalendarHeader = ({ value, setValue }) => {
  const currMonthName = () => {
    return value.format("MMMM");
  };

  const currYear = () => {
    return value.format("YYYY");
  };

  const prevMonth = () => {
    return value.clone().subtract(1, "month");
  };

  const nextMonth = () => {
    return value.clone().add(1, "month");
  };

  return (
    <div className="Header">
      <div className="Previous" onClick={() => setValue(prevMonth())}>
        {String.fromCharCode(171)}
      </div>
      <div>
        {currMonthName()} {currYear()}
      </div>
      <div className="Next" onClick={() => setValue(nextMonth())}>
        {String.fromCharCode(187)}
      </div>
    </div>
  );
};
export default CalendarHeader;
