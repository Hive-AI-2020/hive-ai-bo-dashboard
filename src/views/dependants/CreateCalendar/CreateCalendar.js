import React, { useState, useContext } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Box
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { withRouter } from "react-router-dom";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import PropTypes, { array } from "prop-types";
import { RegularButton, SlotsSingleDay, notify } from "components/index";
import { SlotsContext } from "contexts";
import { API } from "helpers/index";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: "100%"
  },
  innerContainer: {
    maxWidth: "1230px",
    paddingTop: 50
  },
  tabsContainer: {
    marginTop: "66px"
  },
  inputDayPicker: {
    color: "rgb(92, 91, 92)"
  },
  slotCell: {
    border: "0.5px solid rgb(210,210,210)",
    margin: 3,
    textAlign: "center",
    cursor: "pointer",
    borderRadius: 5,
    height: "46px",
    lineHeight: "46px",
    backgroundColor: "white"
  },
  titleSlots: {
    marginLeft: 3,
    textAlign: "center"
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}



const CreateCalendar = props => {
  const classes = useStyles();

  //--------------------CONTEXTS---------------------------------------------------------------

  const { bookingSlotsContext } = useContext(SlotsContext);
  console.log("bookingSlotsContext", bookingSlotsContext)

  //--------------------STATES---------------------------------------------------------------
  const [selectCalendarDateStart, setSelectCalendarDateStart] = React.useState(
    Date.now()
  );
  const [selectCalendarDateEnd, setSelectCalendarDateEnd] = React.useState(
    Date.now()
  );

  const [value, setValue] = useState(0);

  const [slots, setSlots] = useState([]);

  const [isSlots, setIsSlots] = useState(false);

  const [bookingSlots, setBookinSlots] = useState([]);
  console.log("bookingSlots", bookingSlots);

  //-----------------------------------------------------------------------------------

  const daysSlots = {
    monday: bookingSlotsContext.filter(day => day.day === "MONDAY"),
    tuesday: bookingSlotsContext.filter(day => day.day === "TUESDAY"),
    wednesday: bookingSlotsContext.filter(day => day.day === "WEDNESDAY"),
    thursday: bookingSlotsContext.filter(day => day.day === "THURSDAY"),
    friday: bookingSlotsContext.filter(day => day.day === "FRIDAY"),
    saturday: bookingSlotsContext.filter(day => day.day === "SATURDAY"),
    sunday: bookingSlotsContext.filter(day => day.day === "SUNDAY")
  };
  console.log("daysSlots", daysSlots.monday[0].slots);
  const handleDateChange = date => {
    setSelectCalendarDateStart(date);
  };

  const handleDateChangeEnd = date => {
    setSelectCalendarDateEnd(date);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const saveTimeSlots = async () => {

    const data ={
        "companyId": "5e7adb57bf5d582ff88a7969",
        "continousRunning": false,
        "calendarStartDate": moment(selectCalendarDateStart).format("YYYY-MM-DD"),
        "calendarEndDate": moment(selectCalendarDateEnd).format("YYYY-MM-DD"),
        "bookingSlots":bookingSlotsContext
      }

      console.log(data)
    const respCreateCalendar = await API.createBookingCalendar(data)
    if(respCreateCalendar) {
        notify("Slots saved")
    }
  } 

  const calendarDayPickers = (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container alignItems="center">
        <Grid item xs={5}>
          <KeyboardDatePicker
            InputProps={{ className: classes.inputDayPicker }}
            margin="normal"
            id="StartCalendar"
            label="Start period"
            format="MM/dd/yyyy"
            value={selectCalendarDateStart}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </Grid>
        <Grid item xs={5}>
          <KeyboardDatePicker
            InputProps={{ className: classes.inputDayPicker }}
            margin="normal"
            id="date-picker-dialog"
            label="End Period"
            format="MM/dd/yyyy"
            value={selectCalendarDateEnd}
            onChange={handleDateChangeEnd}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
  return (
    <Grid container justify="center">
      <Grid
        item
        container
        xs={12}
        className={classes.innerContainer}
        justify="center"
      >
        <Grid item xs={12}>
          <hr style={{ border: "1px solid #d2d2d2" }} />
        </Grid>

        <Grid
          container
          item
          xs={12}
          alignItems="center"
          className={classes.tabsContainer}
          justify="space-between"
        >
          <Grid item xs={8} >
            {calendarDayPickers}
          </Grid>

          <Grid item xs={3} align="right">
            <RegularButton color="primary" onClick={()=>{saveTimeSlots()}}>Save Time Slots</RegularButton>
          </Grid>
        </Grid>
        <Grid item xs={12} container justify="center">
          <Grid item xs={12}>
            <AppBar
              position="static"
              color="default"
              style={{
                boxShadow: "none",
                backgroundColor: "white",
                border: "none"
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab label="Monday" {...a11yProps(0)} />
                <Tab label="Tuesday" {...a11yProps(1)} />
                <Tab label="Wednesday" {...a11yProps(2)} />
                <Tab label="Thursday" {...a11yProps(3)} />
                <Tab label="Friday" {...a11yProps(4)} />
                <Tab label="Saturday" {...a11yProps(5)} />
                <Tab label="Sunday" {...a11yProps(6)} />
              </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>
              <SlotsSingleDay
                day={"MONDAY"}
                slots={daysSlots.monday[0].slots}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SlotsSingleDay
                day={"TUESDAY"}
                slots={daysSlots.tuesday[0].slots}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <SlotsSingleDay
                day={"WEDNESDAY"}
                slots={daysSlots.wednesday[0].slots}
              />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <SlotsSingleDay
                day={"THURSDAY"}
                slots={daysSlots.thursday[0].slots}
              />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <SlotsSingleDay
                day={"FRIDAY"}
                slots={daysSlots.friday[0].slots}
              />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <SlotsSingleDay
                day={"SATURDAY"}
                slots={daysSlots.saturday[0].slots}
              />
            </TabPanel>
            <TabPanel value={value} index={6}>
              <SlotsSingleDay
                day={"SUNDAY"}
                slots={daysSlots.sunday[0].slots}
              />
            </TabPanel>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withRouter(CreateCalendar);
