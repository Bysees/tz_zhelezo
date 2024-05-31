import { render, screen } from '@testing-library/react'
import { PhotoList } from '../photo.list'
import { photoList } from './mock'

describe('PhotoList', () => {
  test('PhotoList выводит полученный список данных', () => {
    render(<PhotoList photoList={photoList} />)

    const ul = screen.getByTestId('photo-list') as HTMLUListElement
    const list = Array.from(ul.children) as HTMLLIElement[]

    expect(list.length).toBe(photoList.length)

    list.forEach((item, index) => {
      const hasNodeTextFromArr = item.textContent?.includes(photoList[index].title)
      expect(hasNodeTextFromArr).toBeTruthy()
    })
  })

  test('PhotoList ничего не выводит если список пустой', () => {
    render(<PhotoList photoList={[]} />)

    const ul = screen.queryByTestId('photo-list') as HTMLUListElement

    expect(ul).not.toBeInTheDocument()
  })
})
