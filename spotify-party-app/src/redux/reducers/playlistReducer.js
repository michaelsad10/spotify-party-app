const initialState = {
  playlists: [],
  playlistURL: "",
  tracksURL: "",
  playlistName: "",
  playlistId: "",
  currentPlaylist: {
    collaborative: "",
    external_urls: "",
    followers: "",
    images: "",
    name: "",
    tracks: [],
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_PLAYLISTS": {
      return {
        ...state,
        playlists: action.payload.items,
      };
    }
    case "GET_PLAYLIST_DATA": {
      return {
        ...state,
        playlistURL: action.payload.playlistURL,
        tracksURL: action.payload.tracksURL,
        playlistName: action.payload.playlistName,
        playlistId: action.payload.playlistId,
      };
    }
    case "GET_CURRENT_PLAYLIST": {
      return {
        ...state,
        currentPlaylist: {
          collaborative: action.payload.collaborative,
          external_urls: action.payload.external_urls.spotify,
          followers: action.payload.followers.total,
          images: action.payload.images[0].url,
          name: action.payload.name,
          tracks: action.payload.tracks.items,
        },
      };
    }
    default:
      return state;
  }
}
