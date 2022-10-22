import { useState, useEffect } from 'react'
import axios from 'axios'

const fullNameEndPoint = country => `https://restcountries.com/v3.1/name/${country}?fullText=true`

export const useField = type => {
	const [value, setValue] = useState('')

	const onChange = event => {
		setValue(event.target.value)
	}

	return {
		type,
		value,
		onChange
	}
}

export const useCountry = name => {
	const [country, setCountry] = useState(null)

	useEffect(() => {
		if (name !== '') {
			axios.get(fullNameEndPoint(name))
				.then(res => setCountry(res.data[0]))
				.catch(err => console.error(err))
		}
	}, [name])

	return country
}
