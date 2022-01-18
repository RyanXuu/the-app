import dayStyles from "./dayStyles.js";
import {
  React,
  calendarStyles,
  ThemeProvider,
  Button,
  theme,
} from "./index.js";

const DayButton = (day) => {
  const classes = calendarStyles();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          className={
            dayStyles(day) == "before"
              ? classes.beforeDayButton
              : dayStyles(day) == "today"
              ? classes.todayDayButton
              : classes.afterDayButton
          }
          color="primary"
        >
          {day.date}
        </Button>
      </ThemeProvider>
    </div>
  );
};

export default DayButton;
