import { HttpResponse, http } from "msw"
import { BASE_URL } from "shared/api"
import { photoList } from "./mock"

const getPhotosRequest = http.get(`${BASE_URL}/albums/1/photos/`, () => {
  const Link = `
    <https://jsonplaceholder.typicode.com/albums/1/photos/?_page=1_limit=10>; rel="first",
    <https://jsonplaceholder.typicode.com/albums/1/photos/?_page=2_limit=10>; rel="next",
    <https://jsonplaceholder.typicode.com/albums/1/photos/?_page=5_limit=10>; rel="last"
  `
    .split('\n')
    .join()

  return HttpResponse.json(photoList, {
    headers: {
      'x-total-count': String(photoList.length),
      Link: Link
    }
  })
})


export const interceptors = [
  getPhotosRequest
]