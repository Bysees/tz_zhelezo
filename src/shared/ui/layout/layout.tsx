import { PropsWithChildren } from 'react'
import styles from './styles.module.scss'

type LayoutProps = PropsWithChildren & {
  routeLink: React.ReactNode
}

const Layout = (props: LayoutProps) => {
  const { routeLink, children } = props

  return (
    <div>
      <header className={styles.header}>{routeLink}</header>
      <main className={styles.main}>{children}</main>
    </div>
  )
}

export { Layout }
