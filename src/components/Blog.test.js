import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog', () => {
  //let container
  let blog
  let mockHandler
  beforeEach(() => {
    blog = {
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

    mockHandler = jest.fn()
    render(
      <Blog blog={blog} handleLike={mockHandler} handleDelete={() => {}} />
    )
  })

  test('renders blog in compact form', () => {
    screen.getByText('Ten ways to stop testing', {
      exact: false,
    })
    screen.getByText('Test Testsson', { exact: false })

    const urlElement = screen.queryByText('https://goingnowhere.com')
    expect(urlElement).toBeNull()
    const likeElement = screen.queryByText('1111')
    expect(likeElement).toBeNull()
  })

  test('renders details after clicking button', async () => {
    const buttonElement = screen.getByText('view')
    const user = userEvent.setup()
    await user.click(buttonElement)

    screen.debug()
    screen.getByText(blog.url)
    screen.getByText(blog.likes, { exact: false })
  })

  test('clicking like twice logs two events', async () => {
    const viewButton = screen.getByText('view')
    const user = userEvent.setup()
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
