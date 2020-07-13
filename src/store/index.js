import { createStore } from 'redux';

import reducer from '../reducers';

const initStore = preloadedStore => (createStore(
  reducer,
  preloadedStore,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
));

export default initStore;