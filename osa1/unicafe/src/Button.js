
const Button = ({ title, facts, mission }) => {
	return (
		<button onClick={() => mission(facts + 1)}>{title}</button>
	)
}
export default Button
