import { React, useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const [showContent, setShowContent] = useState(false)

	const toggleContent = () => setShowContent(!showContent)

	return (
		<div style={blogStyle}>
			{blog.title} {blog.author} <button onClick={toggleContent}>{showContent === false ? 'view' : 'hide'}</button>
			{
				showContent === true
					? <div>
						<div>{blog.url}</div>
						<div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
						<div>{blog.author}</div>
						<button onClick={handleRemove}>remove</button>
					</div>
					: <div></div>
			}
		</div>
	)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	handleLike: PropTypes.func.isRequired,
	handleRemove: PropTypes.func.isRequired,
}

export default Blog
