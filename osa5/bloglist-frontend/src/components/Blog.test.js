import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog', () => {
	test('renders title', () => {
		const blog = {
			title: 'test title',
			author: 'Test Author',
			url: 'https://localhost:3000'
		}

		const mockHandler = jest.fn()

		render(<Blog blog={blog} handleLike={mockHandler} handleRemove={mockHandler} />)

		const element = screen.queryByText('test title')
		expect(element).toBeDefined()
	})

	test('all content is rendered if view is clicked', async () => {
		const blog = {
			title: 'test title',
			author: 'Test Author',
			url: 'https://localhost:3000'
		}

		const mockHandler = jest.fn()

		render(<Blog blog={blog} handleLike={mockHandler} handleRemove={mockHandler} />)

		const user = userEvent.setup()
		const button = screen.getByText('view')
		await user.click(button)

		expect(mockHandler.mock.calls).toHaveLength(1)
	})


})
