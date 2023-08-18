import { useRouter } from 'next/navigation'

import { Skeleton, TableCell, TableRow } from '@mui/material'

import { limitExcededStr } from '@/utils/helpers/string-helper'

const TableRowPrimary = ({
  row,
  columns,
  viewDetail = false,
  basePath,
  listIsLoading
}) => {
  const router = useRouter()

  const handleRowClick = (path) => {
    router.push(path)
  }

  return (
    <TableRow
      hover
      role='checkbox'
      tabIndex={-1}
      onClick={viewDetail ? () => handleRowClick(`${basePath}/${row.id}`) : null}
    >
      {columns.map(({ name, align, format }, index) => {
        let value = row[name]

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
                : limitExcededStr(value, 14)
            )}
          </TableCell>
        )
      })}
    </TableRow>
  )
}

export default TableRowPrimary