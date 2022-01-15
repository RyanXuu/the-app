import { React, moment } from "./index";

const Calendar = () => {
  const value = moment();
  const startDay = value.clone().startOf("month").startOf("week");
  const endDay = value.clone().endOf("month").endOf("end");
  const day = startDay.clone().subtract(1, "day");
  const calendar = [];

  while (day.isBefore(endDay, "day")) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, "day").clone())
    );
  }

  return (
    <div>
      {calendar.map((week) => (
        <div>
          {week.map((day) => (
            <div>{day.format("D")}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
