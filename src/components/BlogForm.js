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
          value={title}
          name="Title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input type="text" value={url} name="Url" onChange={handleUrlChange} />
      </div>
      <button type="submit">submit</button>
    </form>
  )
}

export default BlogForm
