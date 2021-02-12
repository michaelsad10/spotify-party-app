export const logIn = (params) => ({
  type: "LOGIN",
  payload: params,
});

export const getUserInfo = (info) => ({
  type: "GET_USER_INFO",
  payload: info,
});

export const logOut = () => ({
  type: "LOGOUT",
});
