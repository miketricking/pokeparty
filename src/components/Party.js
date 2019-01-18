import React, { Component } from "react";
import { connect } from "react-redux";

class Party extends Component {
  render() {
    const img = null;

    const partyList = this.props.party.map(pokemon => {
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

const mapStateToProps = state => {
  return {
    party: state.party
  };
};

export default connect(mapStateToProps)(Party);
