
const Filter = ({ search, searchHandler }) => {

	return (
		<div>
			filter numbers by name
			<input value={search} onChange={searchHandler} />
		</div>
	)
}

export default Filter
