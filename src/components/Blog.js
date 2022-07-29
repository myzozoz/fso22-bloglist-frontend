import { useState } from 'react'
import PropTypes, { string } from 'prop-types'
import BlogDetails from './BlogDetails'

const Blog = ({ blog, handleLike, showDelete, handleDelete }) => {
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
        <BlogDetails
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
          showDelete={showDelete}
        />
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }),
  handleLike: PropTypes.func.isRequired,
  showDelete: PropTypes.bool,
  handleDelete: PropTypes.func.isRequired,
}

export default Blog
