import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import { RoutePath } from 'shared/router'

const ErrorPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Что-то пошло не так...</h1>
      <Link className={styles.link} to={RoutePath.dashboard}>
        Вернуться на главную страницу
      </Link>
    </div>
  )
}

export { ErrorPage }
