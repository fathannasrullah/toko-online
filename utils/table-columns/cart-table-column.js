import { currencyFormat } from "../helpers/format-helper";

export const cartTableColumns = [
  {
    name: 'collapsibleRow',
    label: '',
    minWidth: 10,
    collapsibleIcon: true
  },
  {
    name: 'cart',
    label: 'Cart',
    minWidth: 100,
  },
  {
    name: 'totalProducts',
    label: 'Total Product',
    minWidth: 120,
    align: 'right',
    format: (value) => currencyFormat(value, 0)
  },
  {
    name: 'totalQuantity',
    label: 'Total Quantity',
    minWidth: 130,
    align: 'right',
    format: (value) => currencyFormat(value, 0)
  },
  {
    name: 'total',
    label: 'Total Price($)',
    minWidth: 130,
    align: 'right',
    format: (value) => currencyFormat(value, 0)
  }
]