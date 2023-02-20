import { ButtonBase, Container, Divider, Grid, TextField, Typography } from '@mui/material'

import { AppRoutes } from '@/config/routes'
import DiscordIcon from '@/public/images/discord-icon.svg'
import TwitterIcon from '@/public/images/twitter-icon.svg'

import css from './styles.module.css'
import Link from 'next/link'
import { DOCS_LINK, HELP_LINK, PRESS_LINK, CORE_LINK, FORUM_LINK, CHAT_LINK, GUARDIANS_LINK } from '@/config/constants'

const safeProtocolItems = [
  {
    label: 'Core',
    href: CORE_LINK,
  },
  {
    label: 'Developer Docs',
    href: DOCS_LINK,
  },
]

const communityItems = [
  {
    label: 'Safe DAO',
    href: FORUM_LINK,
  },
  {
    label: 'Discord',
    href: CHAT_LINK,
  },
  {
    label: 'Safe Guardians',
    href: GUARDIANS_LINK,
  },
]

const resourcesItems = [
  {
    label: 'Careers',
    href: AppRoutes.careers,
  },
  {
    label: 'Help Center',
    href: HELP_LINK,
  },
  {
    label: 'Brand Kit',
    href: '#',
  },
]

const subFooterItems = [
  {
    label: 'Terms',
    href: AppRoutes.terms,
  },
  {
    label: 'Privacy',
    href: AppRoutes.index,
  },
  {
    label: 'Press Kit',
    href: PRESS_LINK,
  },
  {
    label: 'Licenses',
    href: AppRoutes.index,
  },
  {
    label: 'Cookie Policy',
    href: AppRoutes.index,
  },
  {
    label: 'Preferences',
    href: AppRoutes.index,
  },
]

const Footer = () => {
  return (
    <Container>
      <Grid container flexDirection={{ xs: 'column', md: 'row' }}>
        <Grid item md={2}>
          <Typography variant="caption" color="text.primary">
            Safe Protocol
          </Typography>
          <ul className={css.list}>
            {safeProtocolItems.map((item) => (
              <li className={css.listItem} key={item.href}>
                <Link href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item md={2}>
          <Typography variant="caption" color="text.primary">
            Community
          </Typography>
          <ul className={css.list}>
            {communityItems.map((item) => (
              <li className={css.listItem} key={item.href}>
                <Link href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item md={2}>
          <Typography variant="caption" color="text.primary">
            Resources
          </Typography>
          <ul className={css.list}>
            {resourcesItems.map((item) => (
              <li className={css.listItem} key={item.href}>
                <Link href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item md={4} ml={{ xs: 0, md: 'auto' }}>
          <Typography variant="caption" component="div" color="text.primary" mb={2}>
            Subscribe to our newsletter
          </Typography>
          <TextField fullWidth placeholder="Your email address" />
          <div className={css.socials}>
            <ButtonBase disableRipple aria-label="Discord">
              <DiscordIcon />
            </ButtonBase>
            <ButtonBase disableRipple aria-label="Twitter">
              <TwitterIcon />
            </ButtonBase>
          </div>
        </Grid>
      </Grid>
      <Divider sx={{ mt: '26px' }} />
      <Grid container alignItems="center" justifyContent="space-between" mb={2}>
        <Grid item>
          <ul className={css.subList}>
            {subFooterItems.map((item) => (
              <li className={css.subListItem} key={item.href}>
                <Link href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item my={2}>
          <Typography color="primary.light" fontSize="16px">
            ©2023 Safe Ecosystem Foundation
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Footer
