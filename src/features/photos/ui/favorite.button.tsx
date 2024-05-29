import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'

import { usePhotosHandlers } from 'entities/photos'
import { TPhoto } from 'shared/types'

import styles from './styles.module.scss'

type FavoritePhotoButtonProps = {
  id: TPhoto['id']
}

const FavoritePhotoButton = (props: FavoritePhotoButtonProps) => {
  const { id } = props

  const { checkIsFavorite, toggleFavoritePhoto } = usePhotosHandlers()

  return (
    <button className={styles.button_fav} onClick={() => toggleFavoritePhoto(id)}>
      <FontAwesomeIcon
        icon={checkIsFavorite(id) ? faHeart : faHeartRegular}
        color='red'
        size='2xl'
      />
    </button>
  )
}

export { FavoritePhotoButton }
