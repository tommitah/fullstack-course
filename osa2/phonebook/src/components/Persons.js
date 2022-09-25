import peopleService from '../services/persons'

// Linter cries about the logic inside the callback function
const Persons = ({ persons, search }) => {

	const removePerson = person => {
		window.confirm(`Delete ${person.name}?`)
			? peopleService.remove(person.id)
			: console.log('aborted')
	}

	return (
		<div>
			{
				search === ''
					? persons.map(person => <div key={person.name}>{person.name} {person.number} <button key={person.id} onClick={() => removePerson(person)}>delete</button></div>)
					: persons.map(person => {
						if (person.name.toLowerCase().includes(search.toLowerCase())) {
							return (
								<div key={person.name}>
									{person.name} {person.number}
									<button key={person.id} onClick={() => removePerson(person)}>delete</button>
								</div>
							)
						}
					})
			}
		</div>
	)
}
export default Persons
