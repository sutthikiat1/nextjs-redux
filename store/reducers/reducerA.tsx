const initialState = {
  count: 0,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "incrementCount":
      return {
        ...state,
        count: state.count + action.payload,
      };
    case "resetCount":
      return initialState;
    default:
      return state;
  }
};

export default reducer;
