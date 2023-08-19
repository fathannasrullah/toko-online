'use client'

import {
  Fragment,
  useCallback,
  useEffect,
  useState
} from 'react'

import { useParams } from 'next/navigation'

import {
  Button,
  CardContent,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'

import { useDispatch, useSelector } from 'react-redux'

import { getCartDetail } from '@/store/carts/action'

import { STATUS_REQUEST_CART_DETAIL_PENDING } from '@/utils/constant'

import TopBar from '../AppBar/TopBar'

import { currencyFormat } from '@/utils/helpers/format-helper'

import {
  StyledContinuePayContainer,
  StyledImage,
  StyledProductListContainer,
  StyledSkeleton,
  StyledSummariesContainer
} from './styles'

const CartDetail = () => {
  const params = useParams()
  const { id: cartID } = params

  const [fetchType, setFetchType] = useState({ name: 'initial' })

  const dispatch = useDispatch()
  const { statusRequest, cartDetailData } = useSelector((state) => state.carts)

  const {
    products = [],
    discountedTotal = 0,
    total = 0
  } = cartDetailData

  const detailIsLoading = statusRequest === STATUS_REQUEST_CART_DETAIL_PENDING

  const handleFetchDetail = useCallback(async () => {
    dispatch(getCartDetail(cartID))
  }, [fetchType])

  useEffect(() => {
    handleFetchDetail()
  }, [handleFetchDetail])

  const summaries = [
    {
      label: 'Price',
      value: total,
      format: (value) => currencyFormat(value, 0)
    },
    {
      label: 'Discount',
      value: total - discountedTotal,
      divider: <Divider />,
      format: (value) => currencyFormat(value, 0)
    },
    {
      label: 'Total',
      value: discountedTotal,
      fontWeight: 600,
      format: (value) => currencyFormat(value, 0)
    }
  ]

  return (
    <>
      <TopBar />
      <StyledProductListContainer>
        <List disablePadding>
          {products.map(({ title, price, discountPercentage, quantity, id }) => {
            const discountedPrice = Math.round(price - (discountPercentage/100 * price))
          
            return (
            <Fragment key={id}>
              <ListItem alignItems='flex-start'>
                <ListItemText
                  primary={
                    detailIsLoading ? (
                      <StyledSkeleton variant='rectangular' width='200px' />
                    ) : (
                      title
                    )
                  }
                  secondary={
                    detailIsLoading ? (
                      <StyledSkeleton variant='rectangular' width='150px' />
                    ) : (
                      <Typography>
                        {currencyFormat(discountedPrice, 0)} <del>{price}</del>
                      </Typography>
                    )
                  }
                />
                <ListItemAvatar>
                  <Grid container flexDirection='column' alignItems='center'>
                    <StyledImage alt={`product ${id}`} src='' variant='square'>Product {id}</StyledImage>
                    <Grid container flexDirection='row' justifyContent='flex-end' alignItems='center'>
                      {detailIsLoading ? (
                        <StyledSkeleton variant='rectangular' width='100%' />
                      ) : (
                        <>
                          <IconButton>
                            <RemoveCircleOutlineOutlinedIcon />
                          </IconButton>
                          <Typography>{currencyFormat(quantity, 0)}</Typography>
                          <IconButton>
                            <AddCircleOutlineRoundedIcon />
                          </IconButton>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </ListItemAvatar>
              </ListItem>
              <Divider />
            </Fragment>
          )})}
        </List>
      </StyledProductListContainer>
      <StyledSummariesContainer variant='outlined'>
        <CardContent>
          <Typography variant="h5">
            Summary
          </Typography>
          {summaries.map(({ label, value, fontWeight, divider, format }, index) => (
            <Fragment key={index}>
              <Grid container justifyContent='space-between' sx={{ margin: '3px 0' }}>
                {detailIsLoading ? (
                  <StyledSkeleton variant='rectangular' width='150px' />
                ) : (
                  <Typography sx={{ fontWeight: fontWeight }}>
                    {label}
                  </Typography>
                )}
                {detailIsLoading ? (
                  <StyledSkeleton variant='rectangular' width='100px' />
                ) : (
                  <Typography>
                    {format && typeof value === 'number'
                      ? format(value)
                      : value
                    }
                  </Typography>
                )}
              </Grid>
              {divider}
            </Fragment>
          ))}
        </CardContent>
      </StyledSummariesContainer>
      
      <StyledContinuePayContainer>
        <Grid item xs={12} container justifyContent='space-between' alignItems='center'>
          <Typography>Total : ${currencyFormat(discountedTotal, 0)}</Typography>
          <Button size='large' variant='contained'>Continue and Pay</Button>
        </Grid>
      </StyledContinuePayContainer>
    </>
  )
}

export default CartDetail