import React, { useState } from "react";

import { Grid, Typography, Button, Modal} from "@material-ui/core";

import { Link } from "react-router-dom";
import moment from "moment";
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';import {RegularButton, CalendarComp} from "components"



export const Home = () => {







  return (
    <>
    <Grid container justify="space-evenly">
      <Grid item xs={9} container justify="center" style={{ padding: "2vh 3vw" }}>
        <Grid
          container
          item
          xs={11}
     
          style={{ border: "1px solid black" }}
        >
           
        
          <Grid container item xs={12} style={{ padding: "1vh 1vw" }}>
            <Grid
              container
              item
              xs={12}
              style={{ border: "1px solid #cacaca", padding: "0 1vw"}}
              justify="space-between"
              alignItems="center"
            >
             
              <CalendarComp />
            </Grid>
          </Grid>
        </Grid>
           
      </Grid>

      </Grid>
    </>
  );
};


// const [multiplayer, setMultiplayer] = useState(0);
// const fiveWeeks = 3024000000;
// const addOneMonth = () => {
//   setMultiplayer(multiplayer + 1);
// };
// const removeOneMonth = () => {
//   setMultiplayer(multiplayer - 1);
// };
// const sundayOfTheWeek =
//   Date.now() +
//   multiplayer * fiveWeeks -
//   Number(moment(Date.now()).format("e")) * 86500000;
// const fullMonth = sundayOfTheWeek + 604800000 * 5 - 86400000;

{/* <Grid item xs={6}>
<Typography variant="h6">
  {moment(sundayOfTheWeek).format(" DD MMMM")} {" - "}
  {moment(fullMonth).format("DD MMMM YYYY")}{" "}
</Typography>
</Grid>
<Grid item xs={6} align="right">
<RegularButton color="primary"justIcon size="sm" onClick={() => removeOneMonth()}><KeyboardArrowLeftIcon /></RegularButton>
<RegularButton color="primary" justIcon size="sm" onClick={() => addOneMonth()}><KeyboardArrowRightIcon /></RegularButton>

</Grid> */}