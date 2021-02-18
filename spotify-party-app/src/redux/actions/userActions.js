export const logIn = (params) => ({
  type: "LOGIN",
  payload: params,
});

export const getUserInfo = (info) => ({
  type: "GET_USER_INFO",
  payload: info,
});

export const setConfig = (config) => ({
  type: "SET_CONFIG",
  payload: config,
});

export const logOut = () => ({
  type: "LOGOUT",
});
