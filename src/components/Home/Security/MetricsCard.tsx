import { Box } from '@mui/material'
import { useCallback, useEffect, useRef } from 'react'
import clsx from 'clsx'
import css from './styles.module.css'

const DEPTH_PARAMS = [
  { factor: -0.05, zIndex: 10 },
  { factor: -0.04, zIndex: 9 },
  { factor: -0.03, zIndex: 8 },
  { factor: -0.02, zIndex: 7 },
  { factor: -0.01, zIndex: 6 },
]

export const MetricsCard = ({
  children,
  translateX,
  translateY,
  depth,
  className,
}: {
  children: JSX.Element
  translateX: number
  translateY: number
  className: string
  depth: 0 | 1 | 2 | 3 | 4
}) => {
  const boxRef = useRef<HTMLDivElement>()

  const parallax = useCallback(
    (event: MouseEvent) => {
      if (!boxRef.current) {
        return
      }

      const { top, bottom, left, right } = boxRef.current.getBoundingClientRect()

      const centerY = top + (bottom - top) / 2
      const centerX = left + (right - left) / 2
      const mouseY = event.clientY
      const mouseX = event.clientX

      const diffY = (mouseY - centerY) * DEPTH_PARAMS[depth].factor
      const diffX = (mouseX - centerX) * DEPTH_PARAMS[depth].factor

      boxRef.current.style.transform = `translateX(${translateX + diffX}px) translateY(${translateY + diffY}px)`
    },
    [depth, translateX, translateY],
  )

  useEffect(() => {
    window.addEventListener('mousemove', parallax)

    return () => window.removeEventListener('mousemove', parallax)
  }, [parallax])

  return (
    <Box ref={boxRef} sx={{ zIndex: DEPTH_PARAMS[depth].zIndex }} className={clsx(css.metricsCard, className)}>
      {children}
    </Box>
  )
}
