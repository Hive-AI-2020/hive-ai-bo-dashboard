import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as dateFns from "date-fns";
import "../../../assets/scss/calendar.scss";
import DateFnsUtils from "@date-io/date-fns";

import {
  Grid,
  Typography,
  Modal,
  InputAdornment,
  Switch
} from "@material-ui/core";
import { CustomInput, RegularButton } from "components";
import ScheduleIcon from "@material-ui/icons/Schedule";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { notify } from "components/common/Notification";
import {API} from "helpers"

const data = {
  statusCode: 201,
  message: "Created Successfully",
  data: {
    calendarData: {
      _id: "5e76d1a716363f27482fe60c",
      continousRunning: false,
      isActive: true,
      businessOwnerId: "5e6f544844df517413d103c0",
      companyId: "5e707343f624254169908292",
      bookingSession: 30,
      calendarStartDate: "2020-03-31T13:00:00.000Z",
      calendarEndDate: "2020-12-30T13:00:00.000Z",
      createdAt: "2020-03-22T02:47:03.334Z",
      bookingSlots: [
        {
          _id: "5e76d1a716363f27482fe60d",
          day: "MONDAY",
          slots: [
            {
              _id: "5e76d1a716363f27482fe60e",
              startTime: "09:00",
              endTime: "13:00"
            },
            {
              _id: "5e76d1a716363f27482fe60f",
              startTime: "14:00",
              endTime: "17:00"
            }
          ]
        },
        {
          _id: "5e76d1a716363f27482fe610",
          day: "TUESDAY",
          slots: [
            {
              _id: "5e76d1a716363f27482fe611",
              startTime: "09:00",
              endTime: "13:00"
            },
            {
              _id: "5e76d1a716363f27482fe612",
              startTime: "14:00",
              endTime: "17:00"
            }
          ]
        }
      ],
      __v: 0,
      updatedAt: "2020-03-22T02:47:03.347Z"
    }
  }
};
const daysOfTheWeek = [
  "SUDNAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY"
];

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 700,
    backgroundColor: "#757592eb",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

//---------------------------CALENDAR COMP -----------------------
export const CalendarComp = () => {
  const classes = useStyles();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeTable, setTimeTable] = useState(false);
  const [dayOfTheWeek, setDayOfTheWeek] = useState("");
  const [day, setDay] = useState("");
  console.log("CalendarComp -> day", day);
  const [open, setOpen] = useState(false);
  const [isItCalendar, setIsItCalendar] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [startSlot, setStartSlot] = useState("");
  const [endSlot, setEndSlot] = useState("");

  const [selectCalendarDateStart, setSelectCalendarDateStart] = React.useState(
    Date.now()
  );
  const [selectCalendarDateEnd, setSelectCalendarDateEnd] = React.useState(
    Date.now()
  );

  const handleDateChange = date => {
    setSelectCalendarDateStart(date);
  };

  const handleDateChangeEnd = date => {
    setSelectCalendarDateEnd(date);
  };

  const handleSwitchCalendar = () => setIsItCalendar(!isItCalendar);
  const calendarDayPickers = (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <Grid item xs={5}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
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
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
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
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const header = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="header row flex-middle">
        <div className="column col-start">
          <div className="icon" onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="column col-center">
          <span>{dateFns.format(currentDate, dateFormat)}</span>
        </div>
        <div className="column col-end">
          <div className="icon" onClick={nextMonth}>
            chevron_right
          </div>
        </div>
      </div>
    );
  };
  const days = () => {
    const dateFormat = "eee";
    const days = [];
    let startDate = dateFns.startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="column col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return (
      <div className="days row" style={{ textAlign: "center" }}>
        {days}
      </div>
    );
  };
  const cells = () => {
    const monthStart = dateFns.startOfMonth(currentDate);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`column cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            // onClick={() => onDateClick(cloneDay)}

            onClick={() => {
              setSlots([])
              setDay(moment(cloneDay).format("LL"));
              setDayOfTheWeek(daysOfTheWeek[moment(cloneDay).format("d")]);
              handleOpen();
            }}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {" "}
          {days}{" "}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };
  const nextMonth = () => {
    setCurrentDate(dateFns.addMonths(currentDate, 1));
  };
  const prevMonth = () => {
    setCurrentDate(dateFns.subMonths(currentDate, 1));
  };

  const onDateClick = day => {
    setSelectedDate(day);
  };

  const [slots, setSlots] = useState([]);

  const addSlot = () => {
    let array = slots;
    console.log("addSlot -> slots", slots);
    array.push({startTime:startSlot, endTime:endSlot})
    setSlots(array);
  };

  const interval = (
    <Grid item container xs={12} justify="space-between" alignItems="baseline">
      <Grid item container xs={8} justify="space-evenly">
        <Grid item xs={4}>
          <CustomInput
            id="start"
            labelText="Start"
            required
            inputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ScheduleIcon />
                </InputAdornment>
              ),
              placeholder: "HH:MM  (24h)",
              type: "Start",
              name: "start",
              onChange: e => setStartSlot(e.target.value)
            }}
            formControlProps={{
              fullWidth: true
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <CustomInput
            id="End"
            labelText="End*"
            required
            inputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ScheduleIcon />
                </InputAdornment>
              ),
              placeholder: "HH:MM  (24h)",
              type: "End",
              name: "end",
              onChange: e => setEndSlot(e.target.value)
            }}
            formControlProps={{
              fullWidth: true
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <RegularButton color="danger" size="sm" onClick={() => addSlot()}>
          Add
        </RegularButton>
      </Grid>
    </Grid>
  );

  const createCalendar = async () =>{
    const data = {
      companyId: "5e7adb57bf5d582ff88a7969",
      continousRunning: !isItCalendar,
      calendarStartDate: moment(selectCalendarDateStart).format("YYYY-MM-DD"),
      calendarEndDate: moment(selectCalendarDateEnd).format("YYYY-MM-DD"),
      bookingSlots: [
        {
          day: dayOfTheWeek,
          slots,
        }
      ]
    }
    console.log(data)
    const respCreateCalendar = await API.createBookingCalendar(data);
    if(respCreateCalendar){
      notify("created")
      console.log(respCreateCalendar)
    }
    ;}

  return (
    <>
      <Grid container justify="space-evenly">
        <Grid item xs={9}>
          <div className="calendar">
            <div>{header()}</div>
            <div onClick={e => setTimeTable(true)}>{days()}</div>
            <div onClick={e => setTimeTable(true)}>{cells()}</div>
          </div>
        </Grid>
        {!timeTable ? null : (
          <Grid
            container
            item
            md={3}
            lg={2}
            justify="center"
            style={{ maxHeight: "60vh", overflow: "scroll" }}
          >
            {data.data.calendarData.bookingSlots !== undefined
              ? data.data.calendarData.bookingSlots.map(slot => {
                  if (
                    slot.day === daysOfTheWeek[dateFns.getDay(selectedDate)]
                  ) {
                    slot.slots.map(singleSlot => {
                      return (
                        <div style={{ backgroundColor: "green" }}>
                          {" "}
                          {singleSlot}
                        </div>
                      );
                    });
                  }
                })
              : ""}
            <Grid
              item
              xs={11}
              align="center"
              style={{
                marginBottom: "1vh",
                padding: "2vh 1vw"
              }}
            >
              <Typography variant="h4">
                {dateFns.format(selectedDate, "dd MMMM")}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <Grid container justify="center">
              <Grid item xs={12}>
                <Typography variant="h5" align="center">
                  Edit Availability
                </Typography>
              </Grid>
              <Grid container item xs={12} alignItems="baseline">
                <Grid item xs={6}>
                  <Typography variant="h6" align="right">
                    Choose between a range of dates
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Switch
                    checked={isItCalendar}
                    onChange={handleSwitchCalendar}
                    name="checkedA"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
              </Grid>

              {isItCalendar ? calendarDayPickers : ""}

              {interval}

              <Grid item xs={12}>
                {slots !== undefined && slots.length > 0
                  ? slots.map(slot => {
                      return slot.day === day ? (
                        <Typography
                          variant="subtitle1"
                          style={{ color: "red" }}
                        >
                          {dayOfTheWeek}
                          {". "}
                          {slot.startSlot}
                          {" : "}
                          {slot.endSlot}
                        </Typography>
                      ) : (
                        ""
                      );
                    })
                  : ""}
              </Grid>
              <Grid xs={12} align="center">
                <RegularButton color="primary" onClick={()=> createCalendar()}>
                  {" "}
                  Apply to all the {dayOfTheWeek}s{" "}
                </RegularButton>
              </Grid>
        
            </Grid>
          </div>
        </Modal>
      </div>
    </>
  );
};
