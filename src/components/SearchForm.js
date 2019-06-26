import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Toolbar, InputBase, InputAdornment, IconButton } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Search as SearchIcon, Close as CloseIcon } from '@material-ui/icons';
import { set_search } from '../store/action';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 125,
      '&:focus': {
        width: 200,
      },
    },
  },
  closeButton: {
    margin: theme.spacing(0, 1),
  },
}));

function SearchForm({ set_search, ...props }) {
  const classes = useStyles();
  const [search, setSearch] = useState('');

  const handleSubmitSearch = e => {
    e.preventDefault();
    set_search(search);
  }
  const handleChange = e => {
    setSearch(e.target.value);
  }
  const handleEmptySearch = () => {
    setSearch('');
  }

  useEffect(() => {
    set_search(search);
  // eslint-disable-next-line
  },[search])

  return (
    <div className={classes.root}>
      <Toolbar>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <form data-testid="search-foorm" onSubmit={handleSubmitSearch}>
            <InputBase
              data-testid="search-inpuut"
              placeholder="Search Password"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={search}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'Search Password' }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton data-testid="empty-button" className={classes.closeButton} size="small" aria-label="Toggle password visibility" onClick={handleEmptySearch}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              }
            />
          </form>
        </div>
      </Toolbar>
    </div>
  );
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
  set_search,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
