import {
  React,
  moment,
  useState,
  useEffect,
  styles,
  buildCalendar,
  dayStyles,
  Header,
  styled,
} from "./index";

// const CalendarButton = styled("button")({
//   color: "blue",
//   backgroundColor: "transparent",
// });

const Calendar = () => {
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  return (
    <div className="Calendar">
      <Header value={value} setValue={setValue} />
      <div className="Body">
        <div className="Day-Names">
          {["s", "m", "t", "w", "t", "f", "s"].map((d) => (
            <div className="week">{d}</div>
          ))}
        </div>
        {calendar.map((week) => (
          <div>
            {week.map((day) => (
              <div className="Day" onClick={() => setValue(day)}>
                <div className={dayStyles(day, value)}>
                  <CalendarButton className="calendarButton">
                    {day.format("D")}
                  </CalendarButton>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
