import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';

import PasswordTable from './PasswordTable';
import { render, cleanup } from '@testing-library/react';

describe('PasswordTable tested', () => {
  let passwordTable = {};

  afterEach(cleanup);

  it('renders without crashing', () => {
    passwordTable = render(
      <Provider store={store}>
        <PasswordTable />
      </Provider>
    );
  })
})
