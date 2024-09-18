import { motion, type MotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import css from './styles.module.css'
import { calculateYPosition } from './utils/calculateYPosition'

const Counter = ({ value }: { value: number }) => {
  return (
    <div className={css.counter}>
      <Digit place={1} value={value} />
      <div className={css.dot}>
        <div className={css.number}>.</div>
      </div>
      <Digit place={0.1} value={value} />
      <Digit place={0.01} value={value} />
      <div className={css.percentage}>
        <div className={css.number}>%</div>
      </div>
    </div>
  )
}

const Digit = ({ place, value }: { place: number; value: number }) => {
  const valueRoundedToPlace = Math.floor(value / place) % 10
  const animatedValue = useSpring(valueRoundedToPlace, {
    stiffness: 50,
    damping: 15,
  })

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace)
  }, [animatedValue, valueRoundedToPlace])

  return (
    <div className={css.digit}>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  )
}

const Number = ({ mv, number }: { mv: MotionValue<number>; number: number }) => {
  const y = useTransform(mv, (latest) => calculateYPosition(latest, number))

  return (
    <motion.span style={{ y }} className={css.number}>
      {number}
    </motion.span>
  )
}

export default Counter
