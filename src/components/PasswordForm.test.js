import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';

import PasswordForm from './PasswordForm';
import { render, cleanup } from '@testing-library/react';

describe('PasswordForm tested', () => {
  let passwordForm = {};

  afterEach(cleanup);

  it('renders without crashing', () => {
    passwordForm = render(
      <Provider store={store}>
        <PasswordForm />
      </Provider>
    );
  })
})
