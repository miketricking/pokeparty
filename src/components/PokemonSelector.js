import React, { Component } from "react";
import axios from "axios";

class PokemonSelector extends Component {
  state = {
    pokemon: []
  };
  componentDidMount() {
    axios.get("https://pokeapi.co/api/v2/pokemon/?limit=151").then(res => {
      // There is a pokeapi bug where limit is not working so have to get all and slice it for now
      // https://github.com/PokeAPI/pokeapi/issues/372
      const allPokemon = res.data.results.slice(0, 151);

      // counter that gets updated each time a pokemon has finished returning allowing for  async requests rather than one at a time
      let counter = 0;

      var pokePromise = new Promise(function(resolve, reject) {
        // Loop through all the gen1 pokemon returned in the first request
        allPokemon.forEach(function(pokemon, index, array) {
          // Make a request for each one
          axios
            .get("https://pokeapi.co/api/v2/pokemon/" + pokemon.name + "/")
            .then(res => {
              counter++;
              // Set the pokemon to equal the new data
              array[index] = res.data;

              // Once the last request returns resolve the promise and pass through the new data
              if (counter === array.length) {
                resolve(array);
              }
            });
        });
      });

      pokePromise.then(pokemon => {
        this.setState({
          pokemon: pokemon
        });
      });
    });
  }
  render() {
    const { pokemon } = this.state;

    const pokemonList = pokemon.length ? (
      pokemon.map(pokemon => {
        return (
          <div className="col-sm" key={pokemon.id}>
            {pokemon.name}
          </div>
        );
      })
    ) : (
      <div>Loading pokemon...</div>
    );

    return (
      <div className="container">
        <div className="row">{pokemonList}</div>
      </div>
    );
  }
}

export default PokemonSelector;
