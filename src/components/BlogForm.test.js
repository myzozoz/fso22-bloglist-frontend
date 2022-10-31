import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('BlogForm', () => {
  //let container
  let newBlog
  let mockHandler
  beforeEach(() => {
    newBlog = {
      author: 'Test Testsson',
      title: 'Ten ways to stop testing',
      url: 'https://goingnowhere.com',
    }

    mockHandler = jest.fn((e) => e.preventDefault())
    render(
      <BlogForm
        title={newBlog.title}
        author={newBlog.author}
        url={newBlog.url}
        handleBlogSubmit={mockHandler}
        handleTitleChange={() => {}}
        handleAuthorChange={() => {}}
        handleUrlChange={() => {}}
      />
    )
  })

  test('blog form submits correct data', async () => {
    const submitButton = screen.getByText('submit')
    const user = userEvent.setup()
    await user.click(submitButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    //The form submission does not get any parameters as input,
    //because the title, author and url are kept inside the parent
    //component.
  })
})
