import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('Blog', () => {
  test('renders blog in compact form', async () => {
    const blog = {
      id: '1234asdf',
      author: 'Test Testsson',
      likes: 1111,
      title: 'Ten ways to stop testing',
      url: 'https://goingnowhere.com',
      user: {
        id: '1234abc',
        name: 'Test Testsson',
        username: 'Testo',
      },
    }

    render(<Blog blog={blog} handleLike={() => {}} handleDelete={() => {}} />)
    screen.debug()

    const titleElement = screen.getByText('Ten ways to stop testing', {
      exact: false,
    })
    expect(titleElement).toBeDefined()
    const authorElement = screen.getByText('Test Testsson', { exact: false })
    expect(authorElement).toBeDefined()

    const urlElement = screen.queryByText('https://goingnowhere.com')
    expect(urlElement).toBeNull()
    const likeElement = screen.queryByText('1111')
    expect(likeElement).toBeNull()
  })
})
