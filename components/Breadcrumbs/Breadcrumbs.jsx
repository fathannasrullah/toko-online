import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

import { StyledBreadcrums, StyledHomeIcon } from './styles'

const Breadcrumbs = () => {
  const currentPathname = usePathname()
  const newPathname = currentPathname.split('/')

  const breadcrumbs = newPathname.map((name, index) => {
    let label = name.toUpperCase()
    const link = `/${name}`
    const lastName = newPathname[newPathname.length - 1]

    if (name === '') label = <StyledHomeIcon />

    return (
      currentPathname !== '/' && (
        name === lastName ? (
          <Typography key={index}>{label}</Typography>
        ) : (
          <Link key={index} href={link} passHref>{label}</Link>
        )
      )
    )
  })

  return (
    <StyledBreadcrums separator={<NavigateNextIcon fontSize='small' />}>
      {breadcrumbs}
    </StyledBreadcrums>
  )
}

export default Breadcrumbs