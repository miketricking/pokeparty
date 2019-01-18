const initState = {
  party: []
};

const rootReducer = (state = initState, action) => {
  if (action.type === "ADD_POKEMON") {
    if (state.party.length >= 6) {
      // non mutative to the orginal state array, remove the last item (slice) and replace it with the new one (concat)
      const newArray = state.party.slice(0, 5).concat(action.payload);
      return {
        party: newArray
      };
    } else {
      return {
        party: [...state.party, action.payload]
      };
    }
  }
  return state;
};

export default rootReducer;
