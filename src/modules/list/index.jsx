import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from './actions';

class ListPuppers extends Component {

  fetchData = () => {
    fetch(`/pets?location=${this.props.location}`).then(results => {
      return results.json();
    }).then(myJason => {
      this.props.storeList(myJason.pets)
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.fetchData();
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.props.storeCoordinates(position.coords);
    }, function errorCallback(error) {
      alert('ERROR(' + error.code + '): ' + error.message);
    }
  );

  //get zip code to pass into fetch data
  this.fetchData();

  }

  render() {
    return (
      <div>
        <br />
        <form onSubmit={this.onSubmit}>
          <input placeholder="Enter your zip code here!" onChange={this.props.setLocation} type="search"></input>
        </form>
        <ul>
          {this.props.pets.map(pet => (
            <li key={pet.id}>
              <div>{pet.name}</div>
              <div>
                <img src={pet.image} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStatetoProps(state) {
  console.log(state, "state")
  return {
    pets: state.pets,
    location: state.location,
    coordinates: state.coordinates
  }
}

export default connect(mapStatetoProps, Actions)(ListPuppers);
