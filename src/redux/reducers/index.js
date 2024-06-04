//state= stato attuale
// action = ultima azione dispatchata

const initialState = {
  user: {
    email: [],
  },
};
const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        user: {
          ...state.user,
          email: [...state.user.email, action.payload],
        },
      };
    case "REMOVE_USER":
      return {
        ...state,
        user: {
          ...state.user,
          email: "",
        },
      };
    default:
      return state;
  }
};

export default mainReducer;
