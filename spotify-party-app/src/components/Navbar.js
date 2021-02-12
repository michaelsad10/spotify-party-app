import React, { Component } from "react";
import { AppBar, Toolbar, Button, Typography, Avatar } from "@material-ui/core";

import { connect } from "react-redux";
import { logIn, getUserInfo } from "../redux/actions/userActions";
import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "cb6478161dfb42689b3bca3314c573a2";
const redirectUri = "http://localhost:3000";
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
  clientId +
  "&redirect_uri=" +
  redirectUri +
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
      console.log(config);
      //   console.log(this.props.tokenType);
      //   console.log(this.props.accessToken);
      axios
        .get("https://api.spotify.com/v1/me", config)
        .then((response) => this.props.getUserInfo(response.data));
    }
    console.log(this.state.params);
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
      nav = (
        <div>
          <Button color="inherit"> Log Out</Button>
          <Typography> {this.props.displayName}</Typography>
          <Avatar alt={this.props.displayName} src={this.props.profilePic} />
        </div>
      );
    }
    // console.log(this.props.accessToken);
    return (
      <AppBar position="static">
        <Toolbar>{nav}</Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    accessToken: state.userReducer.accessToken,
    tokenType: state.userReducer.tokenType,
    displayName: state.userReducer.displayName,
    profilePic: state.userReducer.profilePic,
  };
};

const mapDispatchToProps = { logIn, getUserInfo };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
