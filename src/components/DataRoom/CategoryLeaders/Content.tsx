import { useTransform } from 'framer-motion'
import type { RefObject } from 'react'
import { motion } from 'framer-motion'
import { Typography } from '@mui/material'
import { ComparisonType, type TvlComparisonProps } from '@/components/DataRoom/TvlComparison'
import { useSafeDataRoomStats } from '@/hooks/useSafeDataRoomStats'
import { useIsMediumScreen } from '@/hooks/useMaxWidth'
import { formatValue } from '@/lib/formatValue'
import useScrollProgress from '@/hooks/useScrollProgress'
import { TvlComparison } from '@/components/DataRoom/TvlComparison'
import { formatDate } from '@/lib/formatDate'
import { LAST_UPDATED_FALLBACK } from '@/components/DataRoom/IndustryComparison'
import type { BaseBlock } from '@/components/Home/types'
import css from './styles.module.css'

export default function Content({
  title,
  leaders,
  containerRef,
}: Omit<BaseBlock, 'text'> & { leaders: TvlComparisonProps[]; containerRef: RefObject<HTMLDivElement> }) {
  const { tvlLido, tvlEigenLayer, tvlUniswap, tvlAAVE, tvlSafe, lastUpdated } = useSafeDataRoomStats()

  const isMobile = useIsMediumScreen()
  const { scrollYProgress } = useScrollProgress(containerRef)

  // Create a mapping object for TVL values
  const tvlMapping: Record<string, number | null> = {
    tvlLido,
    tvlUniswap,
    tvlSafe,
    tvlEigenLayer,
    tvlAAVE,
  }

  // Get the TVL values for each LEADER
  const dynamicTvl = leaders.map(({ name, tvl: tvlFallback }) => {
    // get the varibale name of the dynamic TVL
    const dynamicTvlString = `tvl${name.split(' ')[0]}`

    return { name, tvl: tvlMapping[dynamicTvlString] || tvlFallback }
  })

  const timestamp = lastUpdated || LAST_UPDATED_FALLBACK
  const formattedDate = formatDate(timestamp)

  const normalizationFactor = 1_000_000_000 // 1 billion
  const squareRatio = formatValue(normalizationFactor)

  const opacity = useTransform(scrollYProgress, isMobile ? [0, 0.35, 0.5, 1.0] : [0.1, 0.35, 0.5, 0.75], [0, 1, 1, 0])

  return (
    <motion.div
      style={{
        opacity,
      }}
      className={css.leadersContainer}
    >
      <Typography className={css.title} variant="h1">
        {title}
      </Typography>

      <Typography className={css.label} color="primary.light">
        1 square - ${squareRatio}
        <span>as of {formattedDate}</span>
      </Typography>

      <div className={css.columnsGrid}>
        {[[0, 1], [2], [3, 4]].map((column, columnIndex) => (
          <div key={columnIndex} className={css.leaderColumn}>
            {column.map((index) => (
              <TvlComparison
                type={ComparisonType.LEADER}
                key={index}
                tvl={dynamicTvl.find((item) => item.name === leaders[index].name)?.tvl || leaders[index].tvl}
                boxColor={leaders[index].boxColor}
                name={leaders[index].name}
                normalizationFactor={normalizationFactor}
              />
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
