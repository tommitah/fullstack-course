const Blog = require('../models/blog')

const testBlogs = [
	{
		title: 'Muh blog',
		author: 'Tommi Tahvanainen',
		url: 'https://localhost:3000',
		likes: 420
	},
	{
		title: 'Shite blog',
		author: 'YOU',
		url: 'https://localhost:3000',
		likes: 0
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
