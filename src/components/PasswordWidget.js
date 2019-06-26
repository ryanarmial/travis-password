import React, { useEffect } from 'react'

import { Typography, Collapse } from '@material-ui/core';

import { Error as ErrorIcon, CheckCircle as CheckIcon } from '@material-ui/icons';

export default function PasswordWidget({ variant, password, onHandlePasswordError, ...props }) {
  const isAllSet = (/.*[A-Z]/g).test(password) && (/.*[a-z]/g).test(password) && (/.*\d/g).test(password) && (/.*\W/g).test(password) && password.length >= 5;
  const minLength = 5;

  useEffect(() => {
    if (isAllSet) {
      onHandlePasswordError(false);
    } else {
      onHandlePasswordError(true);
    }
  // eslint-disable-next-line 
  }, [isAllSet])

  return (
    <div data-testid="password-widget">
      <Typography align="right" variant={variant} color="textSecondary" component="p">
        {password.length} / {minLength}
      </Typography>
      <Collapse in={isAllSet}>
        <Typography data-testid="allset" variant={variant} color="primary" component="p">
          <CheckIcon fontSize="small" /> Your password has been set
        </Typography>
      </Collapse>
      <Collapse in={!isAllSet}>
        <Typography variant={variant} color={!(/.*[A-Z]/g).test(password) ? 'error' : 'primary'} component="p">
          {
            !(/.*[A-Z]/g).test(password) ?
            <ErrorIcon fontSize="small" />
            :
            <CheckIcon fontSize="small" />
          }
          Must have uppercase 
        </Typography>
        <Typography variant={variant} color={!(/.*[a-z]/g).test(password) ? 'error' : 'primary'} component="p">
          {
            !(/.*[a-z]/g).test(password) ?
            <ErrorIcon fontSize="small" />
            :
            <CheckIcon fontSize="small" />
          }
          Must have lowercase
        </Typography>
        <Typography variant={variant} color={!(/.*\d/g).test(password) ? 'error' : 'primary'} component="p">
          {
            !(/.*\d/g).test(password) ?
            <ErrorIcon fontSize="small" />
            :
            <CheckIcon fontSize="small" />
          }
          Must have number character
        </Typography>
        <Typography variant={variant} color={!(/.*\W/g).test(password) ? 'error' : 'primary'} component="p">
          {
            !(/.*\W/g).test(password) ?
            <ErrorIcon fontSize="small" />
            :
            <CheckIcon fontSize="small" />
          }
          Must have special character
        </Typography>
        <Typography variant={variant} color={password.length < 5 ? 'error' : 'primary'} component="p">
          {
            password.length < minLength ?
            <ErrorIcon fontSize="small" />
            :
            <CheckIcon fontSize="small" />
          }
          Must have minimum length 5
        </Typography>
      </Collapse>
    </div>
  )
}
