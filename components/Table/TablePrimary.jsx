import { 
  Card, 
  Paper, 
  TableContainer, 
  Table, 
  TableHead, 
  TableCell,
  TableBody, 
  TablePagination,
  TableRow,
  Grid,
  Typography
} from '@mui/material'

import { isEmpty } from 'lodash'

import TableRowPrimary from './TableRowPrimary'

const TablePrimary = ({
  TableRowCustom = TableRowPrimary,
  columns,
  rows,
  page,
  rowsPerPage,
  viewDetail,
  basePath,
  listIsLoading,
  onPageChange
}) => {
  return (
    <Card>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ height: 640, width: '100%' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align={column.align}
                    sx={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRowCustom
                    key={row.id}
                    row={row}
                    columns={columns}
                    viewDetail={viewDetail}
                    basePath={basePath}
                    listIsLoading={listIsLoading}
                  />
                )
              })}
            </TableBody>
          </Table>
          {isEmpty(rows) && !listIsLoading &&
            <Grid container justifyContent='center' alignItems='center' sx={{ height: '50vh' }}>
              <Typography>Data not found!</Typography>
            </Grid>
          }
        </TableContainer>
        <TablePagination 
          rowsPerPageOptions={[10]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          //onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Card>
  )
}

export default TablePrimary