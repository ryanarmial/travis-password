import React, { Component } from 'react';

import { Container, Grid } from '@material-ui/core';
import { PasswordForm, SearchForm, PasswordTable } from '../components';

export default class Home extends Component {
  render() {
    return (
      <Grid container>
        <Grid container alignItems="center" item sm={3} style={{ height: "100vh", overflow: "auto", backgroundPosition: "right", backgroundImage: "url('https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2Fd-zKJCKsoWw%2Fmaxresdefault.jpg&f=1')" }}>
          <Container>
            <PasswordForm />
          </Container>
        </Grid>
        <Grid container item sm style={{ padding: "5vh 0", height: "100vh", overflow: "auto" }}>
          <Container>
            <SearchForm />
            <PasswordTable />
          </Container>
        </Grid>
      </Grid>
    )
  }
}
