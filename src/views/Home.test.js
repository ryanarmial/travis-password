import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';

import Home from './Home';
import { render, cleanup } from '@testing-library/react';

describe('Home tested', () => {
  let home = {};

  afterEach(cleanup);

  it('renders without crashing', () => {
    home = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  })
})
