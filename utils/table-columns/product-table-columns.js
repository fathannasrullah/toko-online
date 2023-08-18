import { currencyFormat } from "../helpers/format-helper";

export const productTableColumns = [
  {
    name: 'title',
    label: 'Product Name',
    minWidth: 160,
  },
  {
    name: 'brand',
    label: 'Brand',
    minWidth: 160,
  },
  {
    name: 'price',
    label: 'Price($)',
    minWidth: 120,
    align: 'right',
    format: value => currencyFormat(value, 0),
  },
  {
    name: 'stock',
    label: 'Stock',
    minWidth: 120,
    align: 'right',
    format: value => currencyFormat(value, 0)
  },
  {
    name: 'category',
    label: 'Category',
    minWidth: 150 
  }
]