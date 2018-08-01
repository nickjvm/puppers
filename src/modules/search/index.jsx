import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import "./styles.css";

class Search extends Component {
  componentWillMount() {
    this.props.getSearchResults();
  }

  render() {
    return (
      <ul className="results">
        {this.props.results.map(pet => (
          <li key={pet.id.$t}>
            <div>{pet.name.$t}</div>
            <div>
              <img
                src={
                  pet.media.photos.photo.filter(image => {
                    return image["@size"] === "pn";
                  })[0].$t
                }
              />
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    results: state.search.results
  };
}

export default connect(
  mapStateToProps,
  actions
)(Search);
