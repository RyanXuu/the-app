import {
  React,
  moment,
  useState,
  useEffect,
  cssStyles,
  buildCalendar,
  calendarStyles,
  Header,
  styled,
  DayButton,
  ThemeProvider,
  theme,
} from "./index";

const Calendar = () => {
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  const classes = calendarStyles();

  return (
    <ThemeProvider theme={theme}>
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
                  <DayButton
                    date={day.format("D")}
                    month={day.format("M")}
                    year={day.format("Y")}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Calendar;
