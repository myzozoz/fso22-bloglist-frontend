import { useState } from 'react'
import BlogDetails from './BlogDetails'

const Blog = ({ blog, handleLike }) => {
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
      {!compact && <BlogDetails blog={blog} handleLike={handleLike} />}
    </div>
  )
}

export default Blog
