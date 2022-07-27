import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
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

  const blogList = () => (
    <>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel={'create new'}>
        <form onSubmit={handleBlogSubmit}>
          <h2>create new</h2>
          <div>
            title:
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">submit</button>
        </form>
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )

  return (
    <div>
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
        <Togglable buttonLabel={'show'}>{blogList()}</Togglable>
      )}
    </div>
  )
}

export default App
