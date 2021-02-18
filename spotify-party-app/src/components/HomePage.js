import React, { Component } from "react";
import { Paper, Typography, Grid } from "@material-ui/core";
import Playlist from "./Playlist";

class HomePage extends Component {
  render() {
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Playlist />
        </Grid>
      </Grid>
    );
  }
}

export default HomePage;
