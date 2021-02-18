export const getPlaylists = (data) => ({
  type: "GET_PLAYLISTS",
  payload: data,
});

export const getPlaylistData = (data) => ({
  type: "GET_PLAYLIST_DATA",
  payload: data,
});

export const getCurrentPlaylist = (data) => ({
  type: "GET_CURRENT_PLAYLIST",
  payload: data,
});
