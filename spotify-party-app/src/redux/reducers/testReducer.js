const initialState = {
  loggedIn: false,
  userId: "",
  accessToken: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "test": {
    }
    default:
      return state;
  }
}
