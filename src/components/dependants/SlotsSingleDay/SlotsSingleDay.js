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
import { SlotsContext } from "contexts";

import { RegularButton } from "components";

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

export const SlotsSingleDay = props => {
  const classes = useStyles();
  console.log(props);

  //--------------------CONTEXTS---------------------------------------------------------------

  const { bookingSlotsContext, setBookinSlotsContext } = useContext(
    SlotsContext
  );

  //--------------------STATES---------------------------------------------------------------

  const [slots, setSlots] = useState([]);

  const [isSlots, setIsSlots] = useState(false);

  //-----------------------------------------------------------------------------------

  const handleSelect = e => {
    setIsSlots(false);
    let arraySlots = slots;
    const selected = e.target.style.border === "1px solid grey" ? true : false;

    selected
      ? (e.target.style.border = "2px solid #35a1b6")
      : (e.target.style.border = "1px solid grey");
    selected
      ? (e.target.style.backgroundColor = "#95e0f736")
      : (e.target.style.backgroundColor = "white");

    if (selected) {
      let time = e.target.innerText.split(" - ");
      arraySlots.push({
        id: e.target.id,
        startTime: time[0],
        endTime: time[1]
      });
      arraySlots.sort((a, b) => {
        return a.name !== undefined && b.name !== undefined
          ? a.id - b.id || a.name.localeCompare(b.name)
          : null;
      });
      setSlots(arraySlots);
    } else {
      const filtered = arraySlots.filter(slot => {
        return slot.id !== e.target.id;
      });
      filtered.sort((a, b) => {
        return a.id - b.id || a.name.localeCompare(b.name);
      });
      setSlots(filtered);
    }
  };

  const assignDaySlots = () => {
    const arrayDaysSlots = bookingSlotsContext;
    const filteredArray = arrayDaysSlots.filter(slot => slot.day !== props.day);

    filteredArray.push({
      day: props.day,
      slots: slots.map(slot => {
        return { startTime: slot.startTime, endTime: slot.endTime };
      })
    });
    setBookinSlotsContext(filteredArray);

    setIsSlots(true);
  };

  return props.day !== undefined ? (
    <Grid container alignItems="flex-start">
      <Grid item xs={3} container>
        <Grid item className={classes.titleSlots} xs={12}>
          <Typography variant="body2">MORNING</Typography>
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="1"
          onClick={e => handleSelect(e)}
        >
          06:00 - 06:30
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="2"
          onClick={e => handleSelect(e)}
        >
          06:30 - 07:00
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="3"
          onClick={e => handleSelect(e)}
        >
          07:00 - 07:30
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="4"
          onClick={e => handleSelect(e)}
        >
          07:30 - 08:00
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="5"
          onClick={e => handleSelect(e)}
        >
          08:00 - 08:30
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="6"
          onClick={e => handleSelect(e)}
        >
          08:30 - 09:00
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="7"
          onClick={e => handleSelect(e)}
        >
          09:00 - 09:30
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="8"
          onClick={e => handleSelect(e)}
        >
          09:30 - 10:00
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="9"
          onClick={e => handleSelect(e)}
        >
          10:00 - 10:30
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="10"
          onClick={e => handleSelect(e)}
        >
          10:30 - 11:00
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="11"
          onClick={e => handleSelect(e)}
        >
          11:00 - 11:30
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="12"
          onClick={e => handleSelect(e)}
        >
          11:30 - 12:00
        </Grid>
      </Grid>
      <Grid item xs={3} container>
        <Grid item className={classes.titleSlots} xs={12}>
          <Typography variant="body2">AFTERNOON</Typography>
        </Grid>

        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="13"
          onClick={e => handleSelect(e)}
        >
          12:00 - 12:30
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="14"
          onClick={e => handleSelect(e)}
        >
          12:30 - 13:00
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="15"
          onClick={e => handleSelect(e)}
        >
          13:00 - 13:30
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="16"
          onClick={e => handleSelect(e)}
        >
          13:30 - 14:00
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="17"
          onClick={e => handleSelect(e)}
        >
          14:00 - 14:30
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="18 "
          onClick={e => handleSelect(e)}
        >
          14:30 - 15:00
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="19"
          onClick={e => handleSelect(e)}
        >
          15:00 - 15:30
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="20"
          onClick={e => handleSelect(e)}
        >
          15:30 - 16:00
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="21"
          onClick={e => handleSelect(e)}
        >
          16:00 - 16:30
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="22"
          onClick={e => handleSelect(e)}
        >
          16:30 - 17:00
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="23"
          onClick={e => handleSelect(e)}
        >
          17:00 - 17:30
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="24"
          onClick={e => handleSelect(e)}
        >
          17:30 - 18:00
        </Grid>
      </Grid>
      <Grid item xs={3} container>
        <Grid item className={classes.titleSlots} xs={12}>
          <Typography variant="body2">EVENING</Typography>
        </Grid>

        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="25"
          onClick={e => handleSelect(e)}
        >
          18:00 - 18:30
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="26"
          onClick={e => handleSelect(e)}
        >
          18:30 - 19:00
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="27"
          onClick={e => handleSelect(e)}
        >
          19:00 - 19:30
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="28"
          onClick={e => handleSelect(e)}
        >
          19:30 - 20:00
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="29"
          onClick={e => handleSelect(e)}
        >
          20:00 - 20:30
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="30"
          onClick={e => handleSelect(e)}
        >
          20:30 - 21:00
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="31"
          onClick={e => handleSelect(e)}
        >
          21:00 - 21:30
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="32"
          onClick={e => handleSelect(e)}
        >
          21:30 - 22:00
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="33"
          onClick={e => handleSelect(e)}
        >
          22:00 - 22:30
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="34"
          onClick={e => handleSelect(e)}
        >
          22:30 - 23:00
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="35"
          onClick={e => handleSelect(e)}
        >
          23:00 - 23:30
        </Grid>
        <Grid
          item
          className={classes.slotCell}
          xs={12}
          style={{
            border: "1px solid grey",
            backgroundColor: "white"
          }}
          id="36"
          onClick={e => handleSelect(e)}
        >
          23:30 - 00:00
        </Grid>
      </Grid>
      <Grid item xs={3} container>
        <>
          <Grid item className={classes.titleSlots} xs={12}>
            <Typography variant="body2">Saved</Typography>
          </Grid>
          <Grid item container xs={12} justify="center" style={{padding: "2vh 0"}}>
            {props.slots !== undefined
              ? props.slots.map((slot, key) => {
                  return (
                    <Grid item xs={7} key={key} align="center" style={{borderBottom: "1px solid grey"}}>
                      <Typography variant="body2">
                        {slot.startTime}
                        {" - "}
                        {slot.endTime}
                      </Typography>
                    </Grid>
                  );
                })
              : ""}
          </Grid>
        </>
      </Grid>
      <Grid item xs={9} align="center" style={{ padding: "20px 0" }}>
        <RegularButton color="primary" onClick={() => assignDaySlots()}>
          Apply at every {props.day}
        </RegularButton>
      </Grid>
    </Grid>
  ) : (
    "loading"
  );
};
