import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme();

const calendarStyles = makeStyles({
  selectedCalendarButton: {
    color: "grey",
    borderRadius: 50,
    height: "100px",
    width: "100px",
    margin: 100,
  },

  beforeDayButton: {
    color: "blue",
    height: "10px",
  },

  todayDayButton: {
    color: "red",
    height: "50px",
  },

  afterDayButton: {
    color: "green",
    borderRadius: 1,
    backgroundColor: "red",
    height: "100px",
  },
});

export default calendarStyles;
