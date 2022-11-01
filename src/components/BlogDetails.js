const BlogDetails = ({ blog, handleLike, showDelete, handleDelete }) => (
  <>
    <div>{blog.url}</div>
    <div>
      likes: {blog.likes}{' '}
      <button onClick={handleLike} id="likeButton">
        like
      </button>
    </div>
    <div>{blog.user && blog.user.name}</div>
    {showDelete && <button onClick={handleDelete}>remove</button>}
  </>
)

export default BlogDetails
