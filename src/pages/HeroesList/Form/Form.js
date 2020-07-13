import React from 'react';
import {connect} from "react-redux";
import axios from 'axios';

import { organizeData } from '../../../tools/API requests';
import { searchData } from '../../../reducers';

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      heroData: null,
      isLoading: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getData('people');

    console.log(this.state.search);
  }

  handleChange(e) {
    this.setState({
      search: e.target.value,
    })
  }

  getData(resource) {
    this.setState({
      isLoading: true,
    });

    axios(`https://swapi.dev/api/${resource}/?search=${this.state.search}`)
      .then((response) => {
        this.setState({
          isLoading: false,
          heroData: organizeData(response.data.results),
        });
        this.props.searchData(response.data.results);
        // console.log(store.searchData);
      })
      .catch((reject) => {
        console.error(reject);
        this.setState({
          isLoading: false,
        });
      });
  }

  render() {
    const { search, isLoading, data } = this.state;
    return (
      isLoading ? (
        <div>Loading</div>
        ) : (
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="search"
              placeholder="hero, planet, vehicle"
              value={search}
              onChange={this.handleChange}
            />
            <button>search</button>
          </form>
    {
      data ? (
        <div>
          {data.name}
        </div>
      ) : (
        null
      )
    }
        </div>
      )
    );
  }
}

export default connect(null, { searchData })(Form);