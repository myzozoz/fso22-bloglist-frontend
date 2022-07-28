const BlogDetails = ({ blog, handleLike }) => (
  <>
    <div>{blog.url}</div>
    <div>
      likes: {blog.likes} <button onClick={handleLike}>like</button>
    </div>
    <div>{blog.user && blog.user.name}</div>
  </>
)

export default BlogDetails
