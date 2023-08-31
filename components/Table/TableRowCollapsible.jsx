import { useState } from 'react'

import {
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
  Typography,
  Grid,
  Button,
  Skeleton
} from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

import { useRouter } from 'next/navigation'

const TableRowCollapsible = ({
  columns,
  row,
  viewDetail = false,
  basePath,
  listIsLoading,
}) => {
  const router = useRouter()

  const [expandRow, setExpandRow] = useState(false)

  const toggleCollapsible = () => {
    setExpandRow(!expandRow)
  }

  const handleRowClick = (path) => {
    router.push(path)
  }

  return (
    <>
      <TableRow
        hover
        role='checkbox'
        tabIndex={-1}
        onClick={(event) => toggleCollapsible(event)}
      >
        {columns.map(({ name, align, format, collapsibleIcon = false }, index) => {
          let value = row[name]
          if (name === 'cart') value = `Chart ${row.id}`

          return (
            <TableCell
              key={index}
              align={align}
            >
              {listIsLoading ? (
                <Skeleton variant='rectangular' width='100%' />
              ) : (
                format && typeof value === 'number' 
                  ? format(value) 
                  : collapsibleIcon ? (
                      <IconButton
                        edge='start'
                        id={(row.id).toString()}
                        aria-label='expand row'
                        size='small'
                        sx={{ pt: 0, pb:0 }}
                      >
                        {expandRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    ) : (
                      value
                    )
              )}
            </TableCell>
          )
        })}
      </TableRow>
      {expandRow &&
        <TableRow onClick={viewDetail ? () => handleRowClick(`${basePath}/${row.id}`) : null}>
          <TableCell colSpan={5} sx={{ pt: 1, pb: 1}}>
            <Box ml={1}>
              <Grid container alignItems='center'>
                <Typography fontWeight={600} mr={6}>
                  Product List
                </Typography>
                <Button variant='text' size='small' endIcon={<NavigateNextIcon />}>
                  details
                </Button>
              </Grid>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell align='right'>Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right" sx={{ minWidth: 140}}>Total price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map(({ id, title, price, quantity, total }) => (
                    <TableRow key={id}>
                      <TableCell component="th" scope="row">
                        {title}
                      </TableCell>
                      <TableCell align='right'>{price}</TableCell>
                      <TableCell align="right">{quantity}</TableCell>
                      <TableCell align="right">{total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </TableCell>
        </TableRow>
      }
    </>
  )
}

export default TableRowCollapsible