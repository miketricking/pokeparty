export const removeFromParty = uid => {
  console.log(uid);
  return {
    type: "REMOVE_POKEMON",
    playload: uid
  };
};

export const addToParty = pokemon => {
  return {
    type: "ADD_POKEMON",
    payload: pokemon
  };
};
