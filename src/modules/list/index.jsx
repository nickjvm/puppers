import React, { Component } from 'react';
import { connect } from 'react-redux';
import storeList from './actions';

class ListPuppers extends Component {
  componentWillMount() {
    fetch('/pets').then(results => {
      return results.json();
    }).then(myJason => {
      this.props.storeList(myJason.pets)
    })
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.pets.map(pet => (
            <li key={pet.id}>
              <div>{pet.name}</div>
              <div>
              <img src={pet.image}/>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return {pets: state.pets}
}

export default connect(mapStatetoProps, {storeList})(ListPuppers);
