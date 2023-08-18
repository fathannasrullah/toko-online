import { Divider } from '@mui/material'

import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'

export const navigation  = [
  {
    name: 'Toko Online',
    icon: <HomeOutlinedIcon />,
    path: '/',
    divider: <Divider />
  },
  {
    name: 'Product List',
    icon: <ListAltOutlinedIcon />,
    path: '/products'
  },
  {
    name: 'Cart List',
    icon: <ShoppingCartOutlinedIcon />,
    path: '/carts',
    divider: <Divider />
  }
]