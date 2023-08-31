import dynamic from 'next/dynamic'

import {
  Card,
  Paper,
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

const TableRowPrimary = dynamic(() => import('./TableRowPrimary'))

import { StyledTableContainer } from './styles'

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
        <StyledTableContainer>
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
        </StyledTableContainer>
        <TablePagination 
          rowsPerPageOptions={[10]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
        />
      </Paper>
    </Card>
  )
}

export default TablePrimary