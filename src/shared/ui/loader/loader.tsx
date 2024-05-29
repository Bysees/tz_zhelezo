import { FC } from 'react'
import styles from './styles.module.scss'

interface Props {
  className?: string
  center?: boolean
  size?: 'small' | 'normal' | 'big'
}

const Loader: FC<Props> = ({ center, size = 'normal' }) => {


  return (
    <div className={`${styles.wrapper} ${center ? styles.center : ''}`}>
      <div className={`${styles['reverse-spinner']} ${styles[size]}`} />
    </div>
  )
}

export { Loader }