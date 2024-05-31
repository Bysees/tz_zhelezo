import { afterEach, beforeEach, vitest } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { resetIntersectionMocking, setupIntersectionMocking } from 'react-intersection-observer/test-utils'

const windowMock = {
  scrollTo: vitest.fn(),
};

Object.assign(window, windowMock);

beforeEach(() => {
  setupIntersectionMocking(vitest.fn)
})

afterEach(() => {
  resetIntersectionMocking()
  cleanup()
})
