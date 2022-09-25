const logger = require('../utils/logger')
const sortBy = require('lodash/sortBy')

const dummy = blogs => {
	return 1
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
		return prunedBlog
	})
	logger.info('Pruned blogs: ', prunedBlogs)

	// const sortedBlogs = sortBy(prunedBlogs, blog => blog.author)
	// logger.info('Sorted blogs: ', sortedBlogs)

	const hashmap = prunedBlogs.reduce((acc, val) => {
		acc[val] = (acc[val] || 0) + 1
		return acc
	}, {})

	// This is still borked
	// absolutely borked
	const mostFrequentElement = () => {
		return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)
	}
	logger.info('Most frequent:', mostFrequentElement)

	return -1
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
}
