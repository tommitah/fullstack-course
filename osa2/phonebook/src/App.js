import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import peopleService from './services/persons'
import Notification from './components/Notification'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [search, setSearch] = useState('')
	const [message, setMessage] = useState(null)

	const handleNameChange = e => setNewName(e.target.value)
	const handleNumberChange = e => setNewNumber(e.target.value)
	const handleSearchChange = e => setSearch(e.target.value)
	const personExists = name => persons.find(person => person.name === name)

	// this is a bit ugly...
	const updateExistingPerson = person => {
		const modifiedPerson = {
			name: person.name,
			number: newNumber
		}

		window.confirm(`${person.name} is already added to the yellow pages, replace old number with the new?`)
			? peopleService.update(person.id, modifiedPerson)
			: console.log(`Abort updating ${person.name}`)
	}

	const addPerson = e => {
		e.preventDefault()
		const isNewPerson = personExists(newName)
		if (!isNewPerson) {
			const person = { name: newName, number: newNumber }
			peopleService
				.create(person)
				.then(response => {
					setPersons(persons.concat(response.data))
				})
				.then(() => {
					setMessage(`Added ${person.name} to contacts`)
					setTimeout(() => setMessage(null), 5000)
				})
				// .catch(error => console.log(error.response.data))
				.catch(error => {
					setMessage(`${error.response.data.error}`)
					setTimeout(() => setMessage(null), 5000)
			})
		}
		else updateExistingPerson(isNewPerson)
		setNewName('')
		setNewNumber('')
	}

	// Deps injected if the collection needs to be rerendered after operations
	useEffect(() => {
		peopleService
			.getAll()
			.then(response => setPersons(response.data))
	}, [persons])

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} />
			<Filter search={search} searchHandler={handleSearchChange} />
			<h3>Add new entry</h3>
			<PersonForm
				addPerson={addPerson}
				newName={newName}
				newNumber={newNumber}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
			/>
			<h3>Numbers</h3>
			<Persons persons={persons} search={search} />
		</div>
	)
}
export default App
