import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import './../../containers/style.css'

const columns = [
  { id: 'date', label: 'Data/Hora', format: (date) => moment(date).format('DD/MM/YYYY - HH:mm') },
  { id: 'currency', label: 'Moeda', },
  {
    id: 'value', label: 'Valor',
    format: (value) => value.toLocaleString('pt-BR',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 8
      }),
  },
  {
    id: 'balance', label: 'Saldo',
    format: (value) => value.toLocaleString('pt-BR',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 8
      })
  },
  { id: 'operation', label: 'Operação' },

];


const useStyles = makeStyles({
  root: {
    width: '98%',
    marginTop: 100,

  },
  container: {
    maxHeight: 600,
  },
  tableRow: {
    "&:hover": {
      backgroundColor: "#f4f9f4 !important"
    }
  }
});

export default props => {
  const { extract } = props

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const sortedExtract = extract.slice().sort((a, b) => b.date - a.date)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <h3 style={{color: 'green'}}> Histórico de Lançamentos </h3>
      <TableContainer className={classes.container}>
        <Table >
          <TableHead style={{ backgroundColor: '#f4f9f4' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedExtract.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((extract) => {
              return (
                // <TableRow className={classes.tableRow} style={{hoverColor:' #f4f9f4'}} hover role="checkbox" tabIndex={-1} key={extract.code} ></TableRow>
                <TableRow hover className={classes.tableRow} role="checkbox" tabIndex={-1} key={extract.code} >
                  {columns.map((column) => {
                    const value = extract[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} >
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={extract.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}