const Blog = require('../models/blog')

const testBlogs = [
	{
		title: 'Muh blog',
		author: 'Tommi Tahvanainen',
		url: 'https://localhost:3000',
		likes: 420,
		user: '6333546516c5ed4deb20272e'
	},
	{
		title: 'Shite blog',
		author: 'YOU',
		url: 'https://localhost:3000',
		likes: 0,
		user: '6333546516c5ed4deb20272e'
	},
]

// returns an ObjectId that is currently not in use
const nonExistingId = async () => {
	const blog = new Blog({ title: 'removable', author: 'removable' })
	await blog.save()
	await blog.remove()

	return blog._id.toString()
}

const getBlogsJSON = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

const getUsersJSON = async () => {
	const users = await User.find({})
	return users.map(user => user.toJSON())
}

module.exports = {
	testBlogs,
	nonExistingId,
	getBlogsJSON,
	getUsersJSON
}
