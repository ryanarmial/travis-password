import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';

import PasswordWidget from './PasswordWidget';
import { render, cleanup } from '@testing-library/react';

describe('PasswordWidget tested', () => {
  let passwordWidget = {};
  let handlePasswordError = null;

  afterEach(cleanup);

  beforeEach(() => {
    handlePasswordError = input => {
      return input
    }

    passwordWidget = render(
      <Provider store={store}>
        <PasswordWidget password="testTest123/" onHandlePasswordError={handlePasswordError} variant="caption" />
      </Provider>
    );
  })
  
  it('renders without crashing', () => {
    expect(passwordWidget).toBeDefined();
  })
})
