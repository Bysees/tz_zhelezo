import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { FavoritePhotoButton } from 'features/photos'
import { PhotoList, usePhotosHandlers, usePhotosValues } from 'entities/photos'
import { fetchPhotoList } from 'shared/api'
import { Loader } from 'shared/ui'
import { useScrollRestoration } from 'shared/hooks'

import styles from './styles.module.scss'

const PhotosPage = () => {
  const { photoList, lastPage, page } = usePhotosValues()
  const { addPhotos, setLastPage, setPage } = usePhotosHandlers()
  const [status, setStatus] = useState<'init' | 'loading' | 'error' | 'success'>('init')
  const controller = useRef(new AbortController())

  const getPhotoList = async (page: number) => {
    try {
      setStatus('loading')

      const { photoList, lastPage } = await fetchPhotoList({
        page,
        signal: controller.current.signal
      })

      setPage(page + 1)
      setLastPage(lastPage)
      addPhotos(photoList)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const onIntesect = (inView: boolean) => {
    if (inView && page - 1 < lastPage) {
      getPhotoList(page)
    }
  }

  const [intersectRef] = useInView({
    onChange: onIntesect
  })

  useScrollRestoration(PhotosPage.name)

  useEffect(() => {
    return () => {
      controller.current.abort()
    }
  }, [])

  return (
    <>
      <PhotoList
        photoList={photoList}
        FavoriteButton={FavoritePhotoButton}
      />

      {status === 'loading' && <Loader center={page === 1} />}

      {status === 'error' && <div>Произошла ошибка при загрузке фотографий, попробуйте позже...</div>}

      {status !== 'loading' && (
        <div
          data-testid='intersect'
          className={styles.intersect}
          ref={intersectRef}
          aria-description='intersection element'
        />
      )}
    </>
  )
}

export { PhotosPage }
