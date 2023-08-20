'use client'

import { useState } from 'react'

import { usePathname } from 'next/navigation'

import { Button, Grid, Toolbar, } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import Navigation from '../Navigation/Navigation'

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'

import { StyledAppBar, StyledIconButton } from './styles'

const drawerWidth = 240

const PrimaryAppBar = () => {
  const pathname = usePathname()

  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <>
      <StyledAppBar>
        <Toolbar>
          <StyledIconButton
            aria-label='open navigation'
            edge='start'
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </StyledIconButton>
          <Breadcrumbs />
          {pathname === '/' && <Grid container justifyContent='center'><Button>toko online</Button></Grid>}
        </Toolbar>
      </StyledAppBar>
      <Navigation
        drawerWidth={drawerWidth} 
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />
    </>
  )
}

export default PrimaryAppBar