import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    pets: []
  }

  componentWillMount() {
    fetch('/pets').then(results => {
      return results.json();
    }).then(myJason => {
      this.setState({ pets: myJason.pets.pet })
    })
  }

  render() {
    return (
      <div className="App">
        <ul>
          {this.state.pets.map(pet => (
            <li key={pet.id.$t}>
              <div>{pet.name.$t}</div>
              <div>
              <img src={pet.media.photos.photo.filter(image => {
                return image['@size'] === 'pn'
              })[0].$t}/>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
