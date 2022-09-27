const logger = require('../utils/logger')

const dummy = blogs => {
	return 1
}

// can't take credit for this piece of code...
// https://javascript.plainenglish.io/how-to-find-the-most-frequent-element-in-an-array-in-javascript-c85119dc78d2
const mostFrequentElement = array => {
	const hashmap = array.reduce((acc, val) => {
		acc[val] = (acc[val] || 0) + 1
		return acc
	}, {})
	return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)
}

const totalLikes = blogs => {
	let sum = 0

	blogs.forEach(blog => {
		sum += blog.likes
	})

	return sum
}

// This only returns one blog, 
// so it's only reliable if there's a definitive favourite
const favouriteBlog = blogs => {
	const blogLikes = blogs.map(blog => blog.likes)
	let largest = Math.max.apply(0, blogLikes)

	const prunedBlogs = blogs.map(blog => {
		const { _id, url, __v, ...prunedBlog } = blog
		return prunedBlog
	})

	return prunedBlogs.find(blog => blog.likes === largest)
}

const mostBlogs = blogs => {
	const prunedBlogs = blogs.map(blog => {
		const { _id, url, __v, likes, title, ...prunedBlog } = blog
		return prunedBlog.author
	})

	const mostFrequentAuthor = mostFrequentElement(prunedBlogs)

	const authorBlogs = blogs.filter(blog => blog.author === mostFrequentAuthor)

	return { author: mostFrequentAuthor, blogs: authorBlogs.length }
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
}
