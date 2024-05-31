import { TPhoto } from 'shared/types'

import styles from './styles.module.scss'

type PhotoListProps = {
  photoList: TPhoto[]
  FavoriteButton?: React.FC<{ id: TPhoto['id'] }>
}

const PhotoList = (props: PhotoListProps) => {
  const { photoList, FavoriteButton } = props

  if(!photoList.length) {
    return null
  }

  return (
    <ul data-testid='photo-list'>
      {photoList.map(({ id, title, thumbnailUrl }) => {
        return (
          <li className={styles.photo__item} key={id}>
            <h4 className={styles.photo__title}>
              {id} : {title}
            </h4>
            <div className={styles.photo__body}>
              <img src={thumbnailUrl} alt='alumb_photo' />
              {FavoriteButton && <FavoriteButton id={id} />}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export { PhotoList }
