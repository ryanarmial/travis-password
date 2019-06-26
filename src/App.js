import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import RouterView from './RouterView'; 

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterView />
      </Provider>
    )
  }
}