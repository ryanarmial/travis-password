import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import db from '../api/firebase';

import { withStyles, fade, makeStyles, useTheme } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableFooter, TablePagination, TableRow, Paper, IconButton, Typography } from '@material-ui/core';

import {
  FirstPage as FirstPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage as LastPageIcon,
}from '@material-ui/icons';
import { PasswordRow } from './index';

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

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0);
  }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1);
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1);
  }

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="First Page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="Previous Page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Next Page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Last Page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// function createData(url, username, password) {
//   return { url, username, password };
// }

// const rows = [
//   createData('Cupcake', 305, 3.7),
//   createData('Donut', 452, 25.0),
//   createData('Eclair', 262, 16.0),
//   createData('Frozen yoghurt', 159, 6.0),
//   createData('Gingerbread', 356, 16.0),
//   createData('Honeycomb', 408, 3.2),
//   createData('Ice cream sandwich', 237, 9.0),
//   createData('Jelly Bean', 375, 0.0),
//   createData('KitKat', 518, 26.0),
//   createData('Lollipop', 392, 0.2),
//   createData('Marshmallow', 318, 0),
//   createData('Nougat', 360, 19.0),
//   createData('Oreo', 437, 18.0),
// ]

const useStyles2 = makeStyles(theme => ({
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
    margin: '0 5px'
  }
}));

function CustomizedTables({ search, ...props }) {
  const classes = useStyles2();
  const [rows, setRows] = React.useState([])
  const [oriRows, setOriRows] = React.useState([])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const listeningFirestore = () => {
    let tmp = [];

    db
      .collection('passwords')
      .orderBy('updatedAt', 'desc')
      .onSnapshot((querySnapshot) => {
          tmp = [...rows];
          
          // console.log('data changed');
          querySnapshot.forEach((doc) => {
            tmp.push({ ...doc.data(), id: doc.id });
          })
          setOriRows(tmp);
          setRows(tmp);
        });
  }

  useEffect(() => {
    listeningFirestore();
  // eslint-disable-next-line
  },[])

  useEffect(() => {
    setRows(oriRows.filter(row => (new RegExp(search, 'gi')).test(row.password) || (new RegExp(search, 'gi')).test(row.url) || (new RegExp(search, 'gi')).test(row.username)));
  // eslint-disable-next-line
  },[search])

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ACTION</StyledTableCell>
              <StyledTableCell align="center">URL</StyledTableCell>
              <StyledTableCell align="center">Username</StyledTableCell>
              <StyledTableCell align="center">Password</StyledTableCell>
              <StyledTableCell align="center">Created At</StyledTableCell>
              <StyledTableCell align="center">Updated At</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              rows.length === 0 ?
              <StyledTableRow style={{ height: 48 }}>
                <StyledTableCell align="center" colSpan={6}>
                  <Typography variant="h5" color="textSecondary">
                    No password set yet.
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
              :
              <>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <PasswordRow row={row} key={index} />
                ))}

                {emptyRows > 0 && (
                  <StyledTableRow style={{ height: 48 * emptyRows }}>
                    <StyledTableCell colSpan={6} />
                  </StyledTableRow>
                )}
              </>
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'Rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </Paper>
  );
}

const mapStateToProps = ({ search }) => ({
  search,
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomizedTables);