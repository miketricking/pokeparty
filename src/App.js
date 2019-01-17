import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Party from "./components/Party";
import PokemonSelector from "./components/PokemonSelector";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <main role="main">
          <div className="jumbotron">
            <h1 className="display-4">PokeParty</h1>
          </div>
          <Party />
          <PokemonSelector />
        </main>
      </div>
    );
  }
}

export default App;
