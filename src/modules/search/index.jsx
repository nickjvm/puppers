import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import "./styles.css";

import Layout from "../../components/templates/FullWidth";
import Card from "../../components/molecules/Card";

import getPosition from "../../helpers/getPosition";
class Search extends Component {
  async componentDidMount() {
    if (localStorage.getItem("location")) {
      this.props.setSearchParams("location", localStorage.getItem("location"));
      this.props.getSearchResults();
    } else {
      if ("navigator" in window) {
        try {
          const position = await getPosition();
          await this.props.getZipFromCoords(position.coords);
        } catch (e) {
          console.log(e);
        } finally {
          this.props.getSearchResults();
        }
      } else {
        this.props.getSearchResults();
      }
    }
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.getSearchResults();
  };
  setLocation = e => {
    localStorage.setItem("location", e.target.value);
    return this.props.setSearchParams("location", e.target.value);
  };

  render() {
    return (
      <Layout>
        <form onSubmit={this.onSubmit}>
          <input
            type="search"
            onChange={this.setLocation}
            value={this.props.location}
          />
        </form>
        <div className="results">
          {this.props.results.map(pet => {
            let image = "";
            if (pet.media.photos) {
              image = pet.media.photos.photo.filter(image => {
                return image["@size"] === "pn";
              })[0].$t;
            }

            return (
              <Card
                key={pet.id.$t}
                name={pet.name.$t}
                image={image}
                sex={pet.sex.$t}
              />
            );
          })}
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.search.results,
    location: state.search.location
  };
}

export default connect(
  mapStateToProps,
  actions
)(Search);
