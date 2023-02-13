import type { NetworkChipProps } from '@/components/Wallet/NetworkChip'
import NetworkChip from '@/components/Wallet/NetworkChip'
import { Box, Container, Typography } from '@mui/material'
import clsx from 'clsx'
import css from './styles.module.css'
import layoutCss from '@/components/common/styles.module.css'
import { type ChainInfo } from '@safe-global/safe-gateway-typescript-sdk'

export type ChainProps = {
  chainName: ChainInfo['chainName']
  textColor: ChainInfo['theme']['textColor']
  backgroundColor: ChainInfo['theme']['backgroundColor']
}

const defaultThemeColors = {
  backgroundColor: '#E8E7E6',
  textColor: '#000000',
}

type NetworksProps = {
  title: string
  text: string
  networks: NetworkChipProps[][]
  chainsData: ChainProps[]
}

const Networks = ({ title, text, networks, chainsData }: NetworksProps) => (
  <Container className={layoutCss.container}>
    <Typography variant="h2" mb={5} align="center">
      {title}
    </Typography>
    <div className={css.networksWrapper}>
      <div className={css.gradientBase} />
      {networks.map((networksRow, index) => (
        <Box key={index} display="flex" gap="8px" className={index === 0 ? css.slider : css.sliderReverse}>
          {networksRow.map(({ name, icon }) => {
            const chainColors = chainsData.find((chain) => chain.chainName === name) || defaultThemeColors
            return <NetworkChip key={name} icon={icon} name={name} {...chainColors} />
          })}
          {networksRow.map(({ name, icon }) => {
            const chainColors = chainsData.find((chain) => chain.chainName === name) || defaultThemeColors
            return <NetworkChip key={name} icon={icon} name={name} {...chainColors} />
          })}
        </Box>
      ))}
      <div className={clsx(css.gradientBase, css.gradientFlipped)} />
    </div>
    <Typography className={css.secondaryText} variant="body1">
      {text}
    </Typography>
  </Container>
)

export default Networks
