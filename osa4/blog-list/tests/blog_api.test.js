const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { testBlogs, nonExistingId, getBlogsJSON } = require('./test_helper')

const api = supertest(app)
const Blog = require('../models/blog')

//// Note the promises...
// beforeEach(async () => {
// 	await Blog.deleteMany({})
//
// 	const blogObjects = testBlogs.map(blog => new Blog(blog))
// 	const promiseArray = blogObjects.map(blog => blog.save())
// 	await Promise.all(promiseArray)
// })

// TODO: implement users in the tests

beforeEach(async () => {
	await Blog.deleteMany()
	await Blog.insertMany(testBlogs)
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(testBlogs.length)
})

test('id is defined for all blogs', async () => {
	const response = await api.get('/api/blogs')
	response.body.forEach(async blog => expect(blog.id).toBeDefined())
})

test('a specific blog is within the returned notes', async () => {
	const response = await api.get('/api/blogs')
	const titles = response.body.map(r => r.title)
	expect(titles).toContain('Muh blog')
})

test('a valid blog can be added', async () => {
	const newBlog = {
		title: 'The intrigue surrounding Michael Jackson',
		author: 'Dr. Bubilek',
		url: 'https://google.com',
		likes: 69
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await getBlogsJSON()
	expect(blogsAtEnd).toHaveLength(testBlogs.length + 1)

	const titles = blogsAtEnd.map(r => r.title)
	expect(titles).toContain('The intrigue surrounding Michael Jackson')
})

test('an invalid blog can not be added', async () => {
	const newBlog = {
		author: 'Brandon Sanderson',
		likes: 999999
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)

	// no blogs added
	const blogsAtEnd = await getBlogsJSON()
	expect(blogsAtEnd).toHaveLength(testBlogs.length)
})

test('a specific blog can be viewed', async () => {
	const blogsAtStart = await getBlogsJSON()
	const blogToView = blogsAtStart[0]

	const resultBlog = await api
		.get(`/api/blogs/${blogToView.id}`)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

	expect(resultBlog.body).toEqual(processedBlogToView)
})

test('a blog can be deleted', async () => {
	const blogsAtStart = await getBlogsJSON()
	const blogToDelete = blogsAtStart[0]

	await api
		.delete(`/api/blogs/${blogToDelete.id}`)
		.expect(204)

	const blogsAtEnd = await getBlogsJSON()
	expect(blogsAtEnd).toHaveLength(testBlogs.length - 1)

	const titles = blogsAtEnd.map(r => r.title)
	expect(titles).not.toContain(blogToDelete.title)
})

test('if likes are not given, it is initialized to zero', async () => {
	const newBlog = {
		title: 'The Name of the Wind',
		author: 'Patrick Rothfuss',
		url: 'https://localhost:3001'
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await getBlogsJSON()
	expect(blogsAtEnd).toHaveLength(testBlogs.length + 1)

	const addedBlog = blogsAtEnd.filter(blog => blog.title === newBlog.title)
	expect(addedBlog[0].likes).toBeDefined()
	expect(addedBlog[0].likes).toEqual(0)
})

test('blog without a title is not added', async () => {
	const newBlog = {
		author: 'Mie'
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)

	const blogsAtEnd = await getBlogsJSON()
	expect(blogsAtEnd).toHaveLength(testBlogs.length)
})

test('an existing blogs likes can be changed', async () => {
	const newBlog = {
		title: 'Muh blog',
		author: 'Tommi Tahvanainen',
		url: 'https://localhost:3000',
		likes: 69
	}

	const originalBlog = await Blog.find({ title: 'Muh blog' })
	const id = originalBlog.map(blog => blog.id)

	await api
		.put(`/api/blogs/${id}`)
		.send(newBlog)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await getBlogsJSON()
	expect(blogsAtEnd[0].likes).toEqual(newBlog.likes)
})

afterAll(() => mongoose.connection.close())










