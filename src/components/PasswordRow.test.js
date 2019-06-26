import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';

import PasswordRow from './PasswordRow';
import { render, cleanup } from '@testing-library/react';

describe('PasswordRow tested', () => {
  let passwordRow = {};
  let row = {};

  afterEach(cleanup);

  beforeEach(() => {
    row = {
      url: 'test.com',
      password: 'test',
      username: 'test',
      createdAt: Date(),
      updatedAt: Date(),
    }
  })

  it('renders without crashing', () => {
    passwordRow = render(
      <Provider store={store}>
        <table>
          <tbody>
            <PasswordRow row={row} />
          </tbody>
        </table>
      </Provider>
    );
  })
})
