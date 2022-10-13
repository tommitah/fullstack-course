import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)
const dispatch = store.dispatch

const App = () => {
	const good = () => dispatch({ type: 'GOOD' })
	const ok = () => dispatch({ type: 'OK' })
	const bad = () => dispatch({ type: 'BAD' })
	const reset = () => dispatch({ type: 'ZERO' })

	return (
		<div>
			<button onClick={good}>good</button>
			<button onClick={ok}>ok</button>
			<button onClick={bad}>bad</button>
			<button onClick={reset}>reset stats</button>
			<div>good {store.getState().good}</div>
			<div>ok {store.getState().ok}</div>
			<div>bad {store.getState().bad}</div>
		</div>
	)
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
	root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
