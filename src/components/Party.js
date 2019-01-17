import React, { Component } from "react";

class Party extends Component {
  state = {
    pokemon: [
      { id: 1, name: "pika", content: "eletric type pokemon" },
      { id: 2, name: "charmander", content: "fire type pokemon" },
      { id: 3, name: "charmander", content: "fire type pokemon" },
      { id: 4, name: "charmander", content: "fire type pokemon" },
      { id: 5, name: "charmander", content: "fire type pokemon" },
      { id: 6, name: "charmander", content: "fire type pokemon" }
    ]
  };

  render() {
    const img = null;

    const partyList = this.state.pokemon.map(pokemon => {
      return (
        <div className="card col-sm" key={pokemon.id}>
          <img className="card-img-top" src={img} alt="Card cap" />
          <div className="card-body">
            <h5 className="card-title">{pokemon.name}</h5>
            <p className="card-text">{pokemon.content}</p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">{partyList}</div>
      </div>
    );
  }
}

export default Party;
