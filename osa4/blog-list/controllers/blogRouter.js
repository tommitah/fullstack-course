const blogRouter = require('express').Router()
const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

// const getTokenFrom = req => {
// 	const auth = req.get('authorization')
// 	if (auth && auth.toLowerCase().startsWith('bearer ')) {
// 		return auth.substring(7)
// 	}
// 	return null
// }

// express-async-errors handles the try{}catch{next(exception)}
// so we can reduce boilerplate here
blogRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	res.json(blogs)
})

blogRouter.get('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id)
	if (blog)
		res.json(blog)
	else res.status(404).end()
})

blogRouter.delete('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id)
	const decodedToken = jwt.verify(req.token, config.SECRET)
	if (!req.token || !decodedToken.id)
		return res.status(401).json({ error: 'token missing or invalid' })

	if (blog.user.toString() !== decodedToken.id.toString()) {
		return res.status(401).json({ error: 'invalid user' })
	}

	// original
	await Blog.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

blogRouter.post('/', async (req, res) => {
	const body = req.body
	const decodedToken = jwt.verify(req.token, config.SECRET)
	if (!req.token || !decodedToken.id)
		return res.status(401).json({ error: 'token missing or invalid' })

	const user = await User.findById(decodedToken.id)

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	res.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id)

	if (blog) {
		blog.likes = req.body.likes
		await blog.save()
		res.json(blog)
	} else res.sendStatus(404)
})

module.exports = blogRouter
