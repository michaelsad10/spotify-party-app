import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Avatar,
  IconButton,
} from "@material-ui/core";

import { connect } from "react-redux";
import { logIn, getUserInfo, setConfig } from "../redux/actions/userActions";
import { getPlaylists } from "../redux/actions/playlistActions";
import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-collaborative",
  "playlist-read-private",
];
const redirect =
  authEndpoint +
  "client_id=" +
  process.env.REACT_APP_SPOTIFY_CLIENT_ID +
  "&redirect_uri=" +
  process.env.REACT_APP_REDIRECT_URI +
  "&scope=" +
  scopes[0] +
  "%20" +
  scopes[1] +
  "%20" +
  scopes[2] +
  "%20" +
  scopes[3] +
  "%20" +
  scopes[4] +
  "%20" +
  scopes[5] +
  "&response_type=token&show_dialog=true";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      params: {
        accessToken: "",
        tokenType: "",
        expiresIn: "",
      },
    };
  }

  componentDidMount() {
    if (window.location.hash !== "") {
      this.state.params = this.getHashParams();
    }
    if (this.state.params.accessToken !== "") {
      this.props.logIn(this.state.params);
      let config = {
        headers: {
          Authorization:
            "" +
            this.state.params.tokenType +
            " " +
            this.state.params.accessToken,
        },
      };
      this.props.setConfig(config);
      axios
        .get("https://api.spotify.com/v1/me", config)
        .then((response) => this.props.getUserInfo(response.data));
      axios
        .get("https://api.spotify.com/v1/me/playlists?limit=50", config)
        .then((response) => this.props.getPlaylists(response.data));
    }
  }

  getHashParams() {
    var url = window.location.hash; // Gets URI after #
    var urlSplit = url.split("&"); // Splits the URI
    var access_token = urlSplit[0].substring(
      urlSplit[0].indexOf("=") + 1,
      urlSplit[0].length
    ); // Gets Access Token
    var token_type = urlSplit[1].substring(
      urlSplit[1].indexOf("=") + 1,
      urlSplit[1].length
    );
    var expires_in = urlSplit[2].substring(
      urlSplit[2].indexOf("=") + 1,
      urlSplit[2].length
    );
    return {
      accessToken: access_token,
      tokenType: token_type,
      expiresIn: expires_in,
    };
  }
  render() {
    let nav = (
      <div>
        <Button href={redirect} color="inherit">
          Login
        </Button>
      </div>
    );
    if (this.props.accessToken !== "") {
      if (this.props.profilePic === "") {
        nav = (
          <>
            <IconButton edge="start">
              <Avatar>{this.props.displayName.substring(1)}</Avatar>
            </IconButton>
            <Typography variant="h6">{this.props.displayName}</Typography>
            <Button color="inherit"> Log Out</Button>
          </>
        );
      } else {
        nav = (
          <>
            <IconButton edge="start">
              <Avatar
                alt={this.props.displayName}
                src={this.props.profilePic}
              />
            </IconButton>
            <Typography variant="h6">{this.props.displayName}</Typography>
            <Button color="inherit"> Log Out</Button>
          </>
        );
      }
    }
    return (
      <AppBar position="static">
        <Toolbar>{nav}</Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accessToken: state.userReducer.accessToken,
    tokenType: state.userReducer.tokenType,
    displayName: state.userReducer.displayName,
    profilePic: state.userReducer.profilePic,
  };
};

const mapDispatchToProps = { logIn, getUserInfo, getPlaylists, setConfig };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
