import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import db from '../api/firebase';

import { set_editing } from '../store/action';
import { withStyles, fade, makeStyles } from '@material-ui/core/styles';
import { TableCell, TableRow, IconButton, Typography, Fade } from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Create as CreateIcon,
  Done as DoneIcon,
  Close as CancelIcon,
  Visibility,
  VisibilityOff
}from '@material-ui/icons';

const StyledTableCell = withStyles(theme => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: fade(theme.palette.primary.light, 0.20),
    },
  },
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  button: {
    margin: theme.spacing(0, 1, 0, 0),
  },
}));

function PasswordRow({ row, set_editing, ...props }) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [hiddenPassword, setHiddenPassword] = useState(row.password.toString().split('').map(item => '*').join(''));

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const handleShowConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  }
  const handleDeletePassword = () => {
    setShowConfirmation(!showConfirmation);
    // db
    //   .collection('passwords')
    //   .doc(row.id)
    //   .delete()
    //   .then(() => {
    //   })
    //   .catch(err => {
    //     // console.log(err);
    //   })
  }
  const handleEditing = () => {
    set_editing(row);
  }

  useEffect(() => {
    setHiddenPassword(row.password.toString().split('').map(item => '*').join(''));
    setShowPassword(false);
    setShowConfirmation(false);
  // eslint-disable-next-line
  },[row.id])

  return (
    <>
      {
        !showConfirmation ?
        <StyledTableRow>
          <StyledTableCell align="center">
            <Typography noWrap>
              <IconButton className={classes.button} color="primary" size="small" onClick={handleEditing}>
                <CreateIcon fontSize="small" />
              </IconButton>
              <IconButton className={classes.button} color="secondary" size="small" onClick={handleShowConfirmation}>
                <DeleteIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color={!showPassword ? 'default' : 'primary'} onClick={handleShowPassword}>
                {
                  !showPassword ?
                  <VisibilityOff fontSize="small" />
                  :
                  <Visibility fontSize="small" />
                }
              </IconButton>
            </Typography>
          </StyledTableCell>
          <StyledTableCell align="center">{row.url}</StyledTableCell>
          <StyledTableCell align="center">{row.username}</StyledTableCell>
          <StyledTableCell align="center">
            {
              !showPassword ?
              hiddenPassword
              : row.password
            }
          </StyledTableCell>
          <StyledTableCell align="center">
            <Typography variant="caption">
              {
                !showPassword ?
                moment(new Date(row.createdAt)).fromNow()
                : row.createdAt
              }
            </Typography>
          </StyledTableCell>
          <StyledTableCell align="center">
            <Typography variant="caption">
              {
                !showPassword ?
                moment(new Date(row.updatedAt)).fromNow()
                : row.createdAt
              }
            </Typography>
          </StyledTableCell>
        </StyledTableRow>
        :
        <Fade in={showConfirmation}>
          <StyledTableRow style={{ height: 48 }}>
            <StyledTableCell colSpan={6}>
              <IconButton className={classes.button} color="primary" size="small" onClick={handleDeletePassword}>
                <DoneIcon fontSize="small" />
              </IconButton>
              <IconButton className={classes.button} color="secondary" size="small" onClick={handleShowConfirmation}>
                <CancelIcon fontSize="small" />
              </IconButton>
              <Typography variant="body2" display="inline" color="textSecondary">
                Are you sure to delete this password?
              </Typography>
            </StyledTableCell>
          </StyledTableRow>
        </Fade>
      }
    </>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
  set_editing,
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRow);
