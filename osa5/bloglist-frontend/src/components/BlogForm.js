import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
	addBlog,
	newBlog,
	newAuthor,
	newUrl,
	handleBlogChange,
	handleAuthorChange,
	handleUrlChange,
	cancel

}) => (
	<form onSubmit={addBlog}>
		<h2>create new</h2>
		<div>
			title:
			<input
				type='text'
				value={newBlog}
				name='title'
				onChange={handleBlogChange}
			/>
		</div>
		<div>
			author:
			<input
				type='text'
				value={newAuthor}
				name='author'
				onChange={handleAuthorChange}
			/>
		</div>
		<div>
			url:
			<input
				type='url'
				value={newUrl}
				name='url'
				onChange={handleUrlChange}
			/>
		</div>
		<div> <button type="submit">create</button> </div>
		<div> <button onClick={cancel}>cancel</button> </div>
	</form>
)

BlogForm.propTypes = {
	addBlog: PropTypes.func.isRequired,
	newBlog: PropTypes.func.isRequired,
	newAuthor: PropTypes.string.isRequired,
	newUrl: PropTypes.string.isRequired,
	handleBlogChange: PropTypes.func.isRequired,
	handleAuthorChange: PropTypes.func.isRequired,
	handleUrlChange: PropTypes.func.isRequired,
	cancel: PropTypes.func.isRequired
}
export default BlogForm
