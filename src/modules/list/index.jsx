import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from './actions';

export class ListPuppers extends Component {
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
    global.window.navigator.geolocation.getCurrentPosition((position) => {
      fetch(`/location?lat=${position.coords.latitude}&lng=${position.coords.longitude}`).then(results => {
        return results.json();
      }).then(myJason => {
       let locationResult = myJason.results[0].address_components.reduce((accumulator, currentValue) => {
          if(currentValue.types.indexOf("postal_code") >= 0){
            return currentValue.short_name
          }
        })
        let event = {
          target : {
            value: locationResult
          }
        }
        this.props.setLocation(event)
        this.fetchData();
      })
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
          <input placeholder="Enter your zip code here!" onChange={this.props.setLocation} type="search" value={this.props.location}/>
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
  return {
    pets: state.pets,
    location: state.location,
    coordinates: state.coordinates
  }
}

export default connect(mapStatetoProps, Actions)(ListPuppers);
