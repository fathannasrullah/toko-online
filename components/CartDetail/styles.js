import { Avatar, Card, Paper, Skeleton, styled } from '@mui/material'

export const StyledProductListContainer = styled(Paper)(() => ({
  borderRadius: 0
}))

export const StyledImage = styled(Avatar)(() => ({
  fontSize: 12,
  width: 90,
  height: 90,
  borderRadius: '20px'
}))

export const StyledSummariesContainer = styled(Card)(() => ({
  margin: '20px'
}))

export const StyledContinuePayContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '20px',
  borderRadius: '20px 20px 0 0',
  [theme.breakpoints.up('sm')]: {
    left: 240
  }
}))

export const StyledSkeleton = styled(Skeleton)(() => ({
  margin: '6px 0'
}))