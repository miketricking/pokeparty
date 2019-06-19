import React, { Component } from "react";
import { connect } from "react-redux";
import { removeFromParty, deleteParty } from "../actions/pokeActions.js";

class Party extends Component {
  handleClick = uid => {
    this.props.removeFromParty(uid);
  };
  handleSaveClick = () => {
    localStorage.setItem("pokemonParty", JSON.stringify(this.props.party));
  };
  handleDeleteClick = () => {
    if (localStorage.getItem("pokemonParty") !== null) {
      localStorage.removeItem("pokemonParty");
    }
    this.props.deleteParty();
  };
  render() {
    const img = null;

    const partyList = this.props.party.map(pokemon => {
      if (typeof pokemon.id === "undefined") {
        return (
          <div className="card col-sm" key={pokemon.uid}>
            <img
              className="card-img-top"
              src="https://via.placeholder.com/400"
              alt="Card cap"
            />
            <div className="card-body">
              <h5 className="card-title">???</h5>
              <p className="card-text">?</p>
              <h3>{pokemon.uid}</h3>
            </div>
          </div>
        );
      } else {
        return (
          <div className="card col-sm" key={pokemon.uid}>
            <img
              className="card-img-top"
              src={pokemon.sprites.front_default}
              alt="Card cap"
            />
            <div className="card-body">
              <h5 className="card-title">{pokemon.name}</h5>
              <p className="card-text">{pokemon.content}</p>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => this.handleClick(pokemon.uid)}
              >
                Remove
              </button>
              <h3>{pokemon.uid}</h3>
            </div>
          </div>
        );
      }
    });
    return (
      <div className="container">
        <div className="row">{partyList}</div>
        <div className="row mt-3">
          <div className="col-sm">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.handleSaveClick()}
            >
              Save party
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => this.handleDeleteClick()}
            >
              Delete party
            </button>
          </div>
        </div>
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
    removeFromParty: id => {
      dispatch(removeFromParty(id));
    },
    deleteParty: () => {
      dispatch(deleteParty());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Party);
