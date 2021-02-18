const initialState = {
  loggedIn: false,
  userId: "",
  accessToken: "",
  tokenType: "",
  expiresIn: "",
  displayName: "",
  profilePic: "",
  config: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "LOGIN": {
      console.log(action);
      return {
        ...state,
        loggedIn: true,
        accessToken: action.payload.accessToken, // spotify access token
        tokenType: action.payload.tokenType,
        expiresIn: action.payload.expiresIn,
      };
    }
    case "GET_USER_INFO": {
      console.log(action.payload);
      return {
        ...state,
        userId: action.payload.id,
        displayName: action.payload.display_name,
        profilePic: action.payload.images[0].url,
      };
    }
    case "SET_CONFIG": {
      console.log(action.payload);
      return {
        ...state,
        config: action.payload,
      };
    }
    default:
      return state;
  }
}
