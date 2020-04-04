import React, { useState } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Box
} from "@material-ui/core";
import { RegularButton } from "components";
import { preProcessFile } from "../../../../node_modules/typescript/lib/typescript";
import { API } from "helpers/index";
import moment from "moment";

export const BookingTable = props => {
  const [selectedSlot, setSelectedSlot] = useState("");
  const [day, setDate] = useState(moment(props.day).format("YYYY-MM-DD"));

  const setSlot = e => {
    setSelectedSlot(moment(e.target.innerText, "HH:mm").format("HH:mm:ss"));
  };

  const bookSlot = () => {
    const startSlot = selectedSlot;
    const data = {
      companyId: "5e7adb57bf5d582ff88a7969",
      bookingStartTime: `${moment(day).format("YYYY-MM-DD")} ${startSlot}`,
      bookingEndTime: `${moment(day).format("YYYY-MM-DD")} ${moment(
        selectedSlot,
        "HH:mm:ss"
      )
        .add(30, "minutes")
        .format("HH:mm:ss")}`,
      lastName: "string",
      emailId: "string"
    };
    const triggerApi = async () => {
      const respBooking = await console.log(data);

      if (respBooking) {
        console.log("test");
      }
    };
    triggerApi();
  };

  return (
    <>
      <Grid container justify="center">
        {props.slots !== undefined || props.slots.length < 1
          ? props.slots.map((slot, key) => {
              return (
                <Grid item xs={11} key={key}>
                  <RegularButton
                    fullWidth
                    style={{
                        border: "1px solid #35a1b6",
                        backgroundColor: "transparent",
                        transition: "all .3s",
                        color: "#35a1b6"
                    }}
                    color="primary"
                    onClick={e => {
                      setSlot(e);
                    }}
                  >
                    {slot}
                  </RegularButton>
                </Grid>
              );
            })
          : ""}
      </Grid>
      {
        selectedSlot !== "" && selectedSlot !== undefined ?(
      <Grid container justify="center">
        <Grid item xs={11}>
          <RegularButton fullWidth onClick={() => bookSlot()} color="warning">
            {" "}
            Book
          </RegularButton>
        </Grid>
      </Grid>) : ""}
    </>
  );
};
