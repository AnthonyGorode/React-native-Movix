import React, {Component} from 'react';
import Navigation from './src/Navigation/Navigation';
import {Provider} from 'react-redux';
import Store from './src/Store/configStore';

export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Navigation />
      </Provider>
    );
  }
}
