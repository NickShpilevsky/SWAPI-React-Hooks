import React, {PureComponent} from 'react';

import Form from './Form';
import List from "./List/List";
import axios from "axios";

import { allHeroes } from '../../reducers';
import {connect} from "react-redux";

class HeroesList extends PureComponent {

  componentDidMount() {
    console.log('STARTED HEROESLIST');
    let data = [];
    for (let i = 1; i <= 9; i++) {
      axios({
        method: 'get',
        baseURL: `https://swapi.dev/api/people/?page=${i}`,
      })
        .then(response => {
          for (let j = 0; j < response.data.results.length; j++) {
            data.push(response.data.results[j]);
          }
          return data;
        })
        .then( data => {
          this.props.allHeroes(data);
        });
    }
    console.log(data);
  }

  render() {
    return(
      <>
        <Form />
        <List />
      </>
    )
  }
}

export default connect(null, { allHeroes })(HeroesList);