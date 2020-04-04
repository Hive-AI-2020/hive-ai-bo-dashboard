import React, { useState, useEffect } from "react";
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
import { API } from "helpers";
import { BookingTable } from "../BookingTable/BookingTable";

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

//---------------------------CALENDAR COMP -----------------------
export const CalendarComp = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeTable, setTimeTable] = useState(false);
  const [day, setDay] = useState("");
  const [monthlySlots, setMonthlySlots] = useState([])
  const [dailySlots, setDailySlots] = useState([])


  const nextMonth = () => {
    setCurrentDate(dateFns.addMonths(currentDate, 1));
  };
  const prevMonth = () => {
    setCurrentDate(dateFns.subMonths(currentDate, 1));
  };
  //--------------------GET DATA ----------------------------


  useEffect(() => {
    const triggerAPI = async() => {
      const data = {
        companyId: "5e7adb57bf5d582ff88a7969",
        month: moment(currentDate).format("YYYY-MM")
      }
      
      const respMonthlySlots = await API.getCalendar(data)
      if(respMonthlySlots){
        console.log("triggerAPI -> respMonthlySlots", respMonthlySlots)
        setMonthlySlots(respMonthlySlots.data.finalData)
      }
    }
    triggerAPI()
  }, [ currentDate])

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
              const slotsRequest = monthlySlots.filter(slot => slot.day === daysOfTheWeek[cloneDay.getDay()])
              if(monthlySlots[0] === undefined || monthlySlots[0] === null ){return null}else {

                if((moment(cloneDay).isBetween(monthlySlots[0].date,monthlySlots[monthlySlots.length -1].date))  && slotsRequest !== undefined && slotsRequest.length > 0 ){ setDailySlots(slotsRequest[0].slots)}
                console.log(slotsRequest)
           
               setSelectedDate(cloneDay);
              }
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
                paddingTop: "1vh"
              }}
            >
              <Typography variant="h4">
                {dateFns.format(selectedDate, "dd MMMM")}
              </Typography>
            </Grid>
            <Grid item xs={11}>
            <BookingTable slots={dailySlots} day={selectedDate}/>

            </Grid>
          </Grid>
        )}
      </Grid>
      <div></div>
    </>
  );
};
