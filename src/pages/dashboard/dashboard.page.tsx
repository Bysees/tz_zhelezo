import { Link } from 'react-router-dom'

import { FavoritePhotoButton } from 'features/photos'
import { PhotoList, usePhotosValues } from 'entities/photos'
import { RoutePath } from 'shared/router'
import { useScrollRestoration } from 'shared/hooks'

import styles from './styles.module.scss'

const DashboardPage = () => {
  const { favoritePhotoList } = usePhotosValues()

  useScrollRestoration(DashboardPage.name)

  if (favoritePhotoList.length === 0) {
    return (
      <h2 className={styles.title}>
        Сейчас нет избранных фотографий, перейдите в раздел{' '}
        <Link to={RoutePath.photos}>фотографии</Link> и поставьте сердечки тем, которые вам
        понравяться
      </h2>
    )
  }

  return (
    <div>
      <h2 className={styles.title}>Избранные фотографии</h2>
      <PhotoList photoList={favoritePhotoList} FavoriteButton={FavoritePhotoButton} />
    </div>
  )
}

export { DashboardPage }
