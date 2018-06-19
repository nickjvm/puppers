import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    pet: {
      name: {}
    },
    photos: {}
  }

  async componentDidMount() {
    const request = await fetch('/api/pets');
    const response = await request.json()
    const pet = response.pets.pet[0];
    const photos = pet.media.photos.photo.reduce((acc, arr) => {
      return Object.assign(acc, { [arr['@size']]: arr['$t'] })
    }, {})
    this.setState({ pet, photos })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>{this.state.pet.name['$t']}</h1>
        </header>
        <p className="App-intro">
          <img src={this.state.photos.x} alt={this.state.pet.name['$t']}/>
        </p>
      </div>
    );
  }
}

export default App;
