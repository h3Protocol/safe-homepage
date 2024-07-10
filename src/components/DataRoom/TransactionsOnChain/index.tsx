import { Typography } from '@mui/material'
import type { BaseBlock } from '@/components/Home/types'
import Counter from './Counter'
import { useScroll, useTransform, motion } from 'framer-motion'
import React, { useRef } from 'react'
import css from './styles.module.css'
import { useCounterScroll } from './useCounterScroll'
import LinksWrapper from '../LinksWrapper'
import { useIsMediumScreen } from '@/hooks/useMaxWidth'
import { useSafeDataRoomStats } from '@/hooks/useSafeDataRoomStats'

const TRANSACTIONS_ON_CHAIN_PERCENTAGE_FALLBACK = 1.75

const TransactionsOnChain = ({ text, link }: BaseBlock) => {
  const { onChainTransactionsPercentage } = useSafeDataRoomStats()

  const value = onChainTransactionsPercentage || TRANSACTIONS_ON_CHAIN_PERCENTAGE_FALLBACK
  // Converts to percentage with 2 decimal place
  const percentageValue = +(value * 100).toFixed(2)

  return (
    <div className={css.sectionContainer}>
      <div className={css.stickyContainer}>
        <CounterContainer percentage={percentageValue} />

        <div className={css.content}>
          <Typography variant="h1">{text}</Typography>

          <div className={css.linkContainer}>{link && <LinksWrapper {...link} />}</div>
        </div>
      </div>
    </div>
  )
}

const CounterContainer = ({ percentage }: { percentage: number }) => {
  const targetScrollRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: targetScrollRef,
    offset: ['start end', 'end start'],
  })

  const isMobile = useIsMediumScreen()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.1, 1])
  const yTransform = useTransform(scrollYProgress, [0, 0.5], isMobile ? [200, 0] : [600, 0])
  const value = useCounterScroll(scrollYProgress, percentage)

  return (
    <motion.div
      style={{
        opacity,
        y: yTransform,
      }}
      className={css.counterContainer}
      ref={targetScrollRef}
    >
      <div className={css.box1}>
        <Counter value={value} />
      </div>

      <div className={css.box2}>
        <Counter value={value} />
      </div>

      <div>
        <Counter value={value} />
      </div>
    </motion.div>
  )
}

export default TransactionsOnChain
