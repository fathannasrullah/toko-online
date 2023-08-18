import { usePathname, useRouter } from 'next/navigation'

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'

import { navigation } from '@/utils/navigation'

import { StyledDrawerPermanent, StyledDrawerTemporary, StyledListItemButton, StyledNavigation } from './styles'

const Navigation = ({ handleDrawerToggle, mobileOpen }) => {
  const selectedPath = usePathname()
  const router = useRouter()

  const drawer = (
    <List>
      {navigation.map(({ name, icon, path, divider }, index) => (
        <>
          <ListItem key={index} disablePadding>
            <StyledListItemButton
              onClick={() => handleDrawerToggle(router.push(path))}
              selected={path === selectedPath}
            >
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={name} />
            </StyledListItemButton>
          </ListItem>
          {divider}
        </>
      ))}
    </List>
  )

  return (
    <StyledNavigation>
      <StyledDrawerTemporary
        anchor='left'
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </StyledDrawerTemporary>
      <StyledDrawerPermanent variant='permanent' open>
        {drawer}
      </StyledDrawerPermanent>
    </StyledNavigation>
  )
}

export default Navigation