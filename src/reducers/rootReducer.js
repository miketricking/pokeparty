const initState = {
  party: [
    { uid: "0" },
    { uid: "1" },
    { uid: "2" },
    { uid: "3" },
    { uid: "4" },
    { uid: "5" }
  ] // set the intial state to empty objects so using .map can display placeholder content until pokemon are selected
};

// get saved party from local storage
const localParty = JSON.parse(localStorage.getItem("pokemonParty"));
console.log(localParty);
if (localParty != null && localParty.length > 0) {
  initState.party = localParty;
}

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
      ...state,
      party: newArray
    };
  }

  if (action.type === "REMOVE_POKEMON") {
    const newArray = state.party.filter(pokemon => {
      return pokemon.uid !== action.payload;
    });

    // Now it has been removed need to add empty object for placeholder spaces
    const uid = "0-" + Math.random().toString();
    newArray.push({ uid: uid });

    return {
      ...state,
      party: newArray
    };
  }

  return state;
};

export default rootReducer;
