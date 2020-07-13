import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import Routes from './routes';
import LS from "./tools/LocalStorage";
import initStore from "./store";
import {Provider} from "react-redux";

const preloadedStore = {
  authorized: false,
  allHeroes: [{name: 'dfgh', gender: 'yui', films: 'dfgh'}],
};

const LocalStorage = new LS({key: 'data', data: preloadedStore});
const store = initStore(LocalStorage.get('data'));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default LocalStorage;