import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const ErrorMessage = ({ message }) => <div className={'error'}>{message}</div>

const SuccessMessage = ({ message }) => <div className="success">{message}</div>

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setTempMessage = (message, error = false, timeout = 5000) => {
    const setFunction = error ? setErrorMessage : setSuccessMessage

    setFunction(message)
    setTimeout(() => setFunction(null), timeout)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      setTempMessage(`Successfully logged in! Welcome ${user.name}`)
    } catch (exception) {
      console.log(exception)
      setTempMessage(
        `Could not log in! Please check username and password.`,
        true
      )
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('logging out')

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setTempMessage('Logged out')
  }

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    console.log(`submitting new blog ${title}/${author}/${url}`)
    blogFormRef.current.toggleVisibility()
    try {
      const response = await blogService.create({
        title,
        author,
        url,
      })
      setBlogs([...blogs, response])
      setTitle('')
      setAuthor('')
      setUrl('')
      setTempMessage(
        `Successfully added new blog (${response.title} by ${response.author})`
      )
    } catch (exception) {
      setTempMessage(`Could not create new blog!`, true)
    }
  }

  const handleLike = (blog) => async (event) => {
    event.preventDefault()
    try {
      console.log('blog to update', blog)
      const updated = await blogService.update({
        ...blog,
        likes: blog.likes + 1,
      })
      const i = blogs.findIndex((b) => b.id === updated.id)
      console.log('old vs new blog', blog, updated)
      const newBlogs = [...blogs]
      newBlogs[i] = { ...newBlogs[i], likes: updated.likes }
      setBlogs(newBlogs)
    } catch (exception) {
      console.log(exception)
    }
  }

  const blogList = () => (
    <>
      <p>{user.name} logged in</p>
      <Togglable buttonLabel={'create new'} ref={blogFormRef}>
        <BlogForm
          handleBlogSubmit={handleBlogSubmit}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          title={title}
          author={author}
          url={url}
        />
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} handleLike={handleLike(blog)} />
        ))}
    </>
  )

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {successMessage && <SuccessMessage message={successMessage} />}
      {user === null ? (
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      ) : (
        <>
          <button onClick={handleLogout}>logout</button>
          {blogList()}
        </>
      )}
    </div>
  )
}

export default App
