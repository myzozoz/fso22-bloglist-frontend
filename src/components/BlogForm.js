import PropTypes from 'prop-types'

const BlogForm = ({
  handleBlogSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url,
}) => {
  return (
    <form onSubmit={handleBlogSubmit}>
      <h2>create new</h2>
      <div>
        title:
        <input
          type="text"
          id="title"
          value={title}
          name="Title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          id="author"
          value={author}
          name="Author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          id="url"
          name="Url"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">submit</button>
    </form>
  )
}

BlogForm.propTypes = {
  handleBlogSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default BlogForm
