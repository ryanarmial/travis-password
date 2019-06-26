import React, { useEffect } from 'react';
import clsx from 'clsx';
import db from '../api/firebase';
import { connect } from 'react-redux';

import { set_editing } from '../store/action';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, CardHeader, Button, Typography, Grid, IconButton, Input, InputLabel, InputAdornment, FormControl, Collapse } from '@material-ui/core';
import { Visibility, VisibilityOff, Close as CloseIcon } from '@material-ui/icons';
import { PasswordWidget } from './index';

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    flexBasis: 275,
  },
  spacer: {
    margin: '1vh',
  },
}));

function PasswordForm({ currentEditing, set_editing, ...props }) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    url: '',
    username: '',
    password: '',
    showPassword: false,
  });
  const [showWidget, setShowWidget] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const handleChange = event => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleSubmitPassword = e => {
    e.preventDefault();
    if (!passwordError) {
      const { url, username, password } = values;

      handleCloseEditing();
      setShowWidget(false);
      // console.log({
      //   url, username, password, createdAt, updatedAt, showPassword
      // })
      if (currentEditing.id) {
        const updatedAt = Date();

        // db
        //   .collection('passwords')
        //   .doc(currentEditing.id)
        //   .set({
        //     url, username, password, updatedAt
        //   }, { merge: true })
        //   .then(docRef => {
        //     // console.log('updated ---------');
        //     // console.log(docRef);
        //   })
        //   .catch(err => {
        //     // console.log(err);
        //   })
      } else {
        const createdAt = Date();
        const updatedAt = Date();

        // db
        //   .collection('passwords')
        //   .add({
        //     url, username, password, createdAt, updatedAt
        //   })
        //   .then(docRef => {
        //     // console.log('added ---------');
        //     // console.log(docRef);
        //   })
        //   .catch(err => {
        //     // console.log(err);
        //   })
      }
    } else {
      document.getElementById("password").focus();
    }
  }
  const handleShowWidget = input => () => {
    setShowWidget(input);
  }
  const handlePasswordError = input => {
    setPasswordError(input)
  }
  const openEditing = () => {
    if (currentEditing.id) {
      const { url, username, password } = currentEditing;
      setValues({
        ...values,
        url,
        username,
        password,
      })
    }
  }
  const handleCloseEditing = () => {
    set_editing({});
    setValues({
      ...values,
      url: '',
      username: '',
      password: '',
    })
  }

  useEffect(() => {
    openEditing();
  // eslint-disable-next-line
  }, [currentEditing.id])

  return (
    <Card className={classes.card}>
      <form onSubmit={handleSubmitPassword}>
        <CardHeader
          title={
            <Grid container justify="center">
              <Typography variant="h5" gutterBottom>
                Password Manager
              </Typography>
            </Grid>
          }
        />
        <CardContent>
          <Grid container>
            <Grid container justify="flex-end">
              <Collapse in={Boolean(currentEditing.id)}>
                <IconButton onClick={handleCloseEditing}>
                  <CloseIcon />
                </IconButton>
              </Collapse>
            </Grid>
            <Grid container justify="center">
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel required htmlFor="URL">URL</InputLabel>
                <Input
                  required
                  id="url"
                  type="text"
                  value={values.url}
                  onChange={handleChange}
                  onFocus={handleShowWidget(false)}
                />
              </FormControl>
            </Grid>
            <Grid container justify="center">
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel required htmlFor="username">Username</InputLabel>
                <Input
                  required
                  id="username"
                  type="text"
                  value={values.username}
                  onChange={handleChange}
                  onFocus={handleShowWidget(false)}
                />
              </FormControl>
            </Grid>
            <Grid container justify="center">
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel error={showWidget && passwordError} required htmlFor="password">Password</InputLabel>
                <Input
                  error={showWidget && passwordError}
                  required
                  id="password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange}
                  onFocus={handleShowWidget(true)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="Toggle password visibility" onClick={handleClickShowPassword}>
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Collapse in={showWidget}>
              <>
                <div className={classes.spacer}/>
                <Grid container direction="column">
                  <PasswordWidget password={values.password} onHandlePasswordError={handlePasswordError} variant="caption" />
                </Grid>
              </>
            </Collapse>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justify="flex-end">
            <Button type="submit">{currentEditing.id ? 'Update' : 'Create'}</Button>
          </Grid>
        </CardActions>
      </form>
    </Card>
  );
}

const mapStateToProps = ({ currentEditing }) => ({
  currentEditing,
})

const mapDispatchToProps = {
  set_editing,
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordForm);
