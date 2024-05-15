import ParallaxBatchingElement from '@/components/Wallet/ParallaxBatching/ParallaxBatchingElement'
import ParallaxText, { type ParallaxTextProps } from '@/components/common/ParallaxTextOld'

const ParallaxBatching = (props: ParallaxTextProps) => {
  return (
    <ParallaxText {...props}>
      <ParallaxBatchingElement />
    </ParallaxText>
  )
}

export default ParallaxBatching
