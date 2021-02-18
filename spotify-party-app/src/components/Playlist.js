import React, { Component } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Paper,
  Dialog,
  Button,
} from "@material-ui/core";

import axios from "axios";
import { connect } from "react-redux";
import {
  getPlaylistData,
  getCurrentPlaylist,
} from "../redux/actions/playlistActions";
import { openModal, closeModal } from "../redux/actions/modalActions";
import PlaylistModal from "./PlaylistModal";

class Playlist extends Component {
  getInfo = (url, tracksUrl, playlistName, playlistId) => {
    this.props.getPlaylistData({
      playlistURL: url,
      tracksUrl: tracksUrl,
      playlistName: playlistName,
      playlistId: playlistId,
    });
    axios
      .get(
        "https://api.spotify.com/v1/playlists/" + playlistId,
        this.props.config
      )
      .then((response) => this.props.getCurrentPlaylist(response.data));
    this.props.openModal();
  };

  render() {
    let playlists = [];
    if (this.props.playlists.length !== 0) {
      for (let x = 0; x < this.props.playlists.length; x++) {
        let playlist = (
          <Grid item xs={3} style={{ padding: "20px" }}>
            <Paper style={{ width: "300px " }}>
              <Button
                style={{ width: "300px" }}
                onClick={() => {
                  this.getInfo(
                    this.props.playlists[x].external_urls.spotify,
                    this.props.playlists[x].tracks.href,
                    this.props.playlists[x].name,
                    this.props.playlists[x].id
                  );
                }}
              >
                {this.props.playlists[x].name}
              </Button>
            </Paper>
          </Grid>
        );
        playlists.push(playlist);
      }
    }
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={3}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
          >
            {playlists}
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <PlaylistModal />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playlists: state.playlistReducer.playlists,
    config: state.userReducer.config,
  };
};

const mapDispatchToProps = {
  getPlaylistData,
  openModal,
  closeModal,
  getCurrentPlaylist,
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
