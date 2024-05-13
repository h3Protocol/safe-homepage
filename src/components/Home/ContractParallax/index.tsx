import type { ReactElement } from 'react'
import ContractParallaxElement from './ContractParallaxElement'
import ParallaxText, { type ParallaxTextProps } from '@/components/common/ParallaxTextOld'
import layoutCss from '@/components/common/styles.module.css'

const ContractParallax = (props: ParallaxTextProps): ReactElement => {
  return (
    <div className={layoutCss.container}>
      <ParallaxText {...props}>
        <ContractParallaxElement />
      </ParallaxText>
    </div>
  )
}

export default ContractParallax
