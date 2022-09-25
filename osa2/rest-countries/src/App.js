import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
	const [search, setSearch] = useState('')
	const [countries, setCountries] = useState([])
	const [results, setResults] = useState([])

	const handleSearchChange = e => setSearch(e.target.value)

	const getCountryData = () => axios.get('https://restcountries.com/v3.1/all').then(response => setCountries(response.data))

	const updateResults = () => setResults(countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())))

	const displayCountries = (results.length !== 0 && results.length < 10)
		? results.map(result => <div key={result.name.common}>{result.name.common}</div>)
		: <div>Too many matches</div>

	// NOTE to self:
	// this was needed because under the hood react packages all setState calls into one call that.
	// This makes calling separate setStates in succession impossible if one depends on the updated data of the other.
	useEffect(() => {
		getCountryData()
		updateResults()
	}, [countries, search])

	return (
		<div>
			<form>
				find countries
				<input value={search} onChange={handleSearchChange} />
			</form>
			<div>
				{displayCountries}
			</div>
		</div>
	)
}

export default App
