import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addToParty } from "../actions/pokeActions.js";

class PokemonSelector extends Component {
  state = {
    pokemon: []
  };
  componentDidMount() {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?limit=151")
      .then(res => {
        // There is a pokeapi bug where limit is not working so have to get all and slice it for now
        // https://github.com/PokeAPI/pokeapi/issues/372
        const allPokemon = res.data.results.slice(0, 151);

        // counter that gets updated each time a pokemon has finished returning allowing for async requests rather than one at a time
        let counter = 0;

        // setup promise for getting all the data for every pokemon
        const pokePromise = new Promise(function(resolve, reject) {
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

        return pokePromise;
      })
      .then(pokemon => {
        this.setState({
          pokemon
        });
      });
  }
  handleClick = pokemon => {
    // create a copy of the state object so we can make non mutative changes
    const newPokemon = { ...pokemon };

    // set up a uid for the new object, will need to update Math.random to something better
    newPokemon.uid = newPokemon.id + "-" + Math.random().toString();

    // call the dispatch action that is bound to the props passing in the new pokemon object
    this.props.addToParty(newPokemon);
  };
  render() {
    const { pokemon } = this.state;
    const pokemonList = pokemon.length ? (
      pokemon.map(pokemon => {
        return (
          <div
            onClick={() => this.handleClick(pokemon)}
            className="col-6 col-sm-4 col-md-3 col-lg-2 col-xl-1"
            key={pokemon.id}
          >
            <img
              src={pokemon.sprites.front_default}
              className="img-fluid"
              alt="Pokemon"
            />
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

const mapStateToProps = state => {
  return {
    party: state.party
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToParty: pokemon => {
      dispatch(addToParty(pokemon));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonSelector);
