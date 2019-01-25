const initState = {
  party: [
    { uid: 0 },
    { uid: 1 },
    { uid: 2 },
    { uid: 3 },
    { uid: 4 },
    { uid: 5 }
  ] // set the intial state to empty objects so using .map can display placeholder content until pokemon are selected
};

const rootReducer = (state = initState, action) => {
  if (action.type === "ADD_POKEMON") {
    let foundFirstEmptyPoke = false;

    const newArray = state.party.map((pokemon, index) => {
      if (typeof pokemon.id === "undefined" && foundFirstEmptyPoke === false) {
        foundFirstEmptyPoke = true;
        pokemon = action.payload; // set the data to the first object that ios empty
      }
      // if we get to the last pokemon and it's not empty
      if (index === 5 && foundFirstEmptyPoke === false) {
        pokemon = action.payload; // replace the last pokemon with the new one
      }
      return pokemon;
    });
    return {
      party: newArray
    };
  }
  return state;
};

export default rootReducer;
