export const removeFromParty = uid => {
  return {
    type: "REMOVE_POKEMON",
    payload: uid
  };
};

export const deleteParty = () => {
  return {
    type: "REMOVE_ALL_POKEMON"
  };
};

export const addToParty = pokemon => {
  return {
    type: "ADD_POKEMON",
    payload: pokemon
  };
};
