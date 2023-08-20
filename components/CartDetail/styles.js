import { Avatar, Card, Grid, List, Paper, Skeleton, styled } from '@mui/material'

export const StyledProductListContainer = styled(Paper)(() => ({
  borderRadius: 0
}))

export const StyledList = styled(List)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up(601)]: {
    width: '600px'
  }
}))

export const StyledImage = styled(Avatar)(() => ({
  fontSize: 12,
  width: 90,
  height: 90,
  borderRadius: '20px'
}))

export const StyledSummariesContainer = styled(Card)(({ theme }) => ({
  margin: '20px',
  width: '100%',
  [theme.breakpoints.up(601)]: {
    width: '600px'
  }
}))

export const StyledContinuePayContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '20px',
  borderRadius: '20px 20px 0 0',
  [theme.breakpoints.up(1023)]: {
    left: 240
  }
}))

export const StyledContinuePay = styled(Grid)(({ theme }) => ({
  direction: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  maxWidth: '600px'
}))

export const StyledSkeleton = styled(Skeleton)(() => ({
  margin: '6px 0'
}))