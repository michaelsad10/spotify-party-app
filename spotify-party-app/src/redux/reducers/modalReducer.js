const initialState = {
  modalOpen: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "OPEN_MODAL": {
      return {
        ...state,
        modalOpen: true,
      };
    }
    case "CLOSE_MODAL": {
      return {
        ...state,
        modalOpen: false,
      };
    }
    default:
      return state;
  }
}
