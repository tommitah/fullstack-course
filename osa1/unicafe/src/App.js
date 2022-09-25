import { useState } from 'react'
import Button from './Button'
import StatisticTable from './StatisticTable'
// import StatisticLine from './StatisticLine'

function App() {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	//// Line approach
	// if ((good || neutral || bad) !== 0) {
	// 	return (
	// 		<div>
	// 			<p>give feedback</p>
	// 			<Button title="good" facts={good} mission={setGood}></Button>
	// 			<Button title="neutral" facts={neutral} mission={setNeutral}></Button>
	// 			<Button title="bad" facts={bad} mission={setBad}></Button>
	// 			<StatisticLine text="good" value={good} />
	// 			<StatisticLine text="neutral" value={neutral} />
	// 			<StatisticLine text="bad" value={bad} />
	// 			<StatisticLine text="all" value={good + neutral + bad} />
	// 			<StatisticLine text="average" value={[good, neutral, bad]} />
	// 			<StatisticLine text="positive" value={[good, neutral, bad]} />
	// 		</div>
	// 	)
	// }

	//// Table approach
	if ((good || neutral || bad) !== 0) {
		return (
			<>
				<p>give feedback</p>
				<Button title="good" facts={good} mission={setGood}></Button>
				<Button title="neutral" facts={neutral} mission={setNeutral}></Button>
				<Button title="bad" facts={bad} mission={setBad}></Button>
				<StatisticTable good={good} neutral={neutral} bad={bad} />
			</>
		)
	}

	return (
		<div>
			<p>give feedback</p>
			<Button title="good" facts={good} mission={setGood}></Button>
			<Button title="neutral" facts={neutral} mission={setNeutral}></Button>
			<Button title="bad" facts={bad} mission={setBad}></Button>
			<p>No feedback given</p>
		</div>
	)
}

export default App;
