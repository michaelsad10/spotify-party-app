import React, { Component } from "react";
import { connect } from "react-redux";
import { Paper, Typography, Grid, Button } from "@material-ui/core";
import axios from "axios";

class PlaylistModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qr: "",
    };
  }
  generateQRCode = (url) => {
    console.log(url);
    axios
      .get(
        `https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=200x200`
      )
      .then((response) => {
        // console.log(response);
        if (response != null) {
          this.setState({ qr: response.config.url });
        }
      });
  };
  makeCollaborative = () => {
    let data = {
      public: false,
      collaborative: true,
    };
    axios
      .put(
        `https://api.spotify.com/v1/playlists/${this.props.playlistId}`,
        data,
        this.props.config
      )
      .then((response) => {
        console.log(response);
      });
  };

  makeUncollaborative = () => {
    let data = {
      public: true,
      collaborative: false,
    };
    axios
      .put(
        `https://api.spotify.com/v1/playlists/${this.props.playlistId}`,
        data,
        this.props.config
      )
      .then((response) => {
        console.log(response);
      });
  };

  render() {
    let tracks = [];
    let collab;
    if (this.props.currentPlaylist.collaborative) {
      collab = (
        <Grid item xs={4}>
          <Button onClick={() => this.makeUncollaborative()}>
            Make Uncollaborative
          </Button>
        </Grid>
      );
    } else {
      collab = (
        <Grid item xs={4}>
          <Button onClick={() => this.makeCollaborative()}>
            {" "}
            Make Collaborative
          </Button>
        </Grid>
      );
    }
    if (this.props.currentPlaylist.tracks.length !== 0) {
      for (let x = 0; x < this.props.currentPlaylist.tracks.length; x++) {
        let song = (
          <Grid item xs={3}>
            <Typography style={{ padding: "10px" }}>
              {this.props.currentPlaylist.tracks[x].track.name}:{" "}
              {this.props.currentPlaylist.tracks[x].track.artists[0].name}
            </Typography>
            <img
              style={{ height: "200px", width: "200px", padding: "20px" }}
              src={
                this.props.currentPlaylist.tracks[x].track.album.images[0].url
              }
            />
          </Grid>
        );
        tracks.push(song);
      }
    }
    return (
      <Paper
        style={{
          width: "1200px",
          height: "800px",
          overflowY: "scroll",
          textAlign: "center",
          overflowX: "hidden",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={8}></Grid>
          {collab}
          <Grid item xs={12}>
            <Button
              onClick={() =>
                // console.log(this.props.currentPlaylist.external_urls)
                this.generateQRCode(this.props.currentPlaylist.external_urls)
              }
            >
              {" "}
              QR{" "}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <img
              src={this.state.qr}
              style={{ width: "200px", height: "200px" }}
            ></img>
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ textAlign: "center" }}>
              {" "}
              {this.props.currentPlaylist.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ textAlign: "center" }}>
              Follower Count: {this.props.currentPlaylist.followers}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <img
              style={{ height: "200px", width: "200px", margin: "0 auto" }}
              src={this.props.currentPlaylist.images}
            ></img>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {tracks}
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentPlaylist: state.playlistReducer.currentPlaylist,
    config: state.userReducer.config,
    playlistId: state.playlistReducer.playlistId,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistModal);
