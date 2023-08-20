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
  StyledContinuePay,
  StyledContinuePayContainer,
  StyledImage,
  StyledList,
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
      color: 'primary',
      value: discountedTotal,
      fontWeight: 600,
      format: (value) => currencyFormat(value, 0)
    }
  ]

  return (
    <>
      <TopBar />
      <StyledProductListContainer>
        <Grid container justifyContent='center'>
          <StyledList disablePadding>
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
              )
            })}
          </StyledList>
        </Grid>
      </StyledProductListContainer>
      <Grid container justifyContent='center'>
        <StyledSummariesContainer variant='outlined'>
        <CardContent>
          <Typography variant='h5' color='primary'>
            Summary
          </Typography>
          {summaries.map(({ label, value, fontWeight, color, divider, format }, index) => (
            <Fragment key={index}>
              <Grid container justifyContent='space-between' sx={{ margin: '3px 0' }}>
                {detailIsLoading ? (
                  <StyledSkeleton variant='rectangular' width='150px' />
                ) : (
                  <Typography color={color} fontWeight={fontWeight}>
                    {label}
                  </Typography>
                )}
                {detailIsLoading ? (
                  <StyledSkeleton variant='rectangular' width='100px' />
                ) : (
                  <Typography color={color}>
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
      </Grid>
      <StyledContinuePayContainer>
        <Grid container justifyContent='center'>
          <StyledContinuePay item container spacing={2}>
            <Grid item><Typography color='primary' fontWeight={600}>Total : ${currencyFormat(discountedTotal, 0)}</Typography></Grid>
            <Grid item><Button size='large' variant='contained'>Continue and Pay</Button></Grid>
          </StyledContinuePay>
        </Grid>
      </StyledContinuePayContainer>
    </>
  )
}

export default CartDetail