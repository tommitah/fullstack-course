import { React, useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [newBlog, setNewBlog] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')
	const [message, setMessage] = useState(null)
	const [messageType, setMessageType] = useState(null)
	const [toggleBlog, setToggleBlog] = useState(false)

	const handleBlogChange = event => setNewBlog(event.target.value)
	const handleAuthorChange = event => setNewAuthor(event.target.value)
	const handleUrlChange = event => setNewUrl(event.target.value)
	const handleToggle = () => setToggleBlog(true)
	const handleCancel = event => {
		event.preventDefault()
		setNewBlog('')
		setNewAuthor('')
		setNewUrl('')
		setToggleBlog(false)
	}

	const addBlog = async event => {
		event.preventDefault()

		const newBlogObject = {
			title: newBlog,
			author: newAuthor,
			url: newUrl
		}

		try {
			await blogService.create(newBlogObject)
			setMessage(`A new blog ${newBlogObject.title} by ${newBlogObject.author} added!`)
			setMessageType('notification-success')
			setTimeout(() => {
				setMessage(null)
				setMessageType(null)
			}, 5000)
			setNewBlog('')
			setNewAuthor('')
			setNewUrl('')
			setToggleBlog(false)
		} catch (exception) {
			console.log(exception.message)
		}
	}

	const removeBlog = async blog => {
		try {
			window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
				? await blogService.remove(blog.id)
				: console.log(`Abort deleting ${blog.title}`)
		} catch (exception) {
			console.error(exception.message)
		}
	}

	const addLike = async blog => {

		const newBlogObject = {
			id: blog.id,
			title: blog.title,
			author: blog.author,
			url: blog.url,
			user: blog.user,
			likes: blog.likes + 1
		}

		try {
			await blogService.update(newBlogObject.id, newBlogObject)
		} catch (exception) {
			console.error(exception.message)
		}
	}

	const handleLogin = async event => {
		event.preventDefault()

		try {
			const user = await loginService.login({ username, password, })
			window.localStorage.setItem(
				'loggedUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setMessage('wrong username or password')
			setMessageType('notification-error')
			setTimeout(() => {
				setMessage(null)
				setMessageType(null)
			}, 5000)
			console.log(exception.message)
		}
	}

	// JWT is stateless, and we can't remove the token serverside,
	// but we can remove the user from client
	const logout = async event => {
		event.preventDefault()
		window.localStorage.removeItem('loggedUser')
		setUser(null)
		setUsername('')
		setPassword('')
	}

	useEffect(() => {
		blogService.getAll().then(blogs => {
			blogs.sort((a, b) => b.likes - a.likes)
			setBlogs(blogs)
		})
	}, [blogs])

	return (
		<div>
			<h1>blogs</h1>
			<Notification message={message} type={messageType} />
			<div>
				{
					user === null
						? <LoginForm
							handleLogin={handleLogin}
							handleUsernameChange={({ target }) => setUsername(target.value)}
							handlePasswordChange={({ target }) => setPassword(target.value)}
							username={username}
							password={password}
						/>
						: <div>
							<form onSubmit={logout}>
								<p>
									{user.username} logged in
									<button type='submit'>logout</button>
								</p>
							</form>
							{
								toggleBlog === false
									? <button onClick={handleToggle}>new blog</button>
									: <BlogForm
										addBlog={addBlog}
										newBlog={newBlog}
										newAuthor={newAuthor}
										newUrl={newUrl}
										handleBlogChange={handleBlogChange}
										handleAuthorChange={handleAuthorChange}
										handleUrlChange={handleUrlChange}
										cancel={handleCancel}
									/>
							}
						</div>
				}
			</div>
			{blogs.map(blog => <Blog key={blog.id} blog={blog} handleLike={() => addLike(blog)} handleRemove={() => removeBlog(blog)} />)}
		</div>
	)
}

export default App
