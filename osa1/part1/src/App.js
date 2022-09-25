const Footer = () => {
	return (
		<div>
			greeting app created by:
			<a href="https://github.com/tommitah">tommitah</a>
		</div>
	)
}

const Hello = (props) => {
	return (
		<div>
			<p>Hello {props.name}, you are {props.age} years old.</p>
		</div>
	)
}

const App = () => {
	const now = new Date().getMilliseconds()
	const a = 10
	const b = 20
	// <Hello name="Venlu :3" age={25} />

	// return (
	// 	<div>
	// 		<Hello name="Tommi" age={now} />
	// 		<p>
	// 			{a} plus {b} is {a + b}
	// 		</p>
	// 		<Footer />
	// 	</div>
	// )

	return [
		<Hello name="Tommi" age={now} />,
		<p>
			{a} plus {b} is {a + b}
		</p>,
		<Footer />
	]
}

export default App
