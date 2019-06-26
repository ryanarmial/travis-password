import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';

import SearchForm from './SearchForm';
import { render, cleanup, fireEvent } from '@testing-library/react';

describe('PasswordRow tested', () => {
  let searchForm = {};

  afterEach(cleanup);

  beforeEach(() => {
    searchForm = render(
      <Provider store={store}>
        <SearchForm />
      </Provider>
    );
  })

  it('renders without crashing', () => {
    expect(searchForm).toBeDefined();
  })

  it('runs handleChange', () => {
    const { debug, getByTestId } = searchForm;
    // debug();
    fireEvent.change(getByTestId('search-form').querySelector('input'), { target: { value: 'testing'}})
    expect(getByTestId('search-form').querySelector('input').value).toBe('testing');
  })

  it('empties search keyword', () => {
    const { debug, getByTestId } = searchForm;
    // debug();
    fireEvent.click(getByTestId('empty-button'));
    expect(getByTestId('search-form').querySelector('input').value).toBe('');
  })

  it('runs handleSubmitSearch', () => {
    const { debug, getByTestId } = searchForm;

    fireEvent.submit(getByTestId('search-form'), { key: 'Enter', code: 13 })
  })
})
