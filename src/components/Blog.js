import { useState } from 'react'

const Blog = ({ blog }) => {
  const [compact, setCompact] = useState(true)

  const blogStyle = {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    cursor: 'pointer',
  }
  return (
    <div style={blogStyle}>
      <div onClick={() => setCompact(!compact)}>
        {blog.title} {blog.author} <button>{compact ? 'view' : 'hide'}</button>
      </div>
      {!compact && (
        <>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes}{' '}
            <button onClick={(event) => event.preventDefault()}>like</button>
          </div>
          <div>{blog.user && blog.user.name}</div>
        </>
      )}
    </div>
  )
}

export default Blog
