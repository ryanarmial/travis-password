import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Home } from './views';

export default class RouterView extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact render={(props) => (<Home {...props} />)} />
        </Switch>
      </Router>
    )
  }
}