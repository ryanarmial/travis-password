import React from 'react';
// import ReactDOM from 'react-dom';
import App from './App';
import { render, cleanup } from '@testing-library/react'

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

describe('App tested', () => {
  let app = {};

  afterEach(cleanup);

  it('renders without crashing', () => {
    app = render(<App />)
  })
})
