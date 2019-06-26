import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import RouterView from './RouterView';
import { render, cleanup } from '@testing-library/react';

describe('RouterView tested', () => {
  let routerView = {};

  afterEach(cleanup);

  it('renders without crashing', () => {
    routerView = render(
      <Provider store={store}>
        <RouterView />
      </Provider>
    );
  })
})
