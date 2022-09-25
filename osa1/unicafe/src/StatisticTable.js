import { average, positivePercentage } from './CalculationFunctions'

const StatisticTable = ({ good, neutral, bad }) => {

	return (
		<table>
			<tbody>
				<tr>
					<td>good</td>
					<td>{good}</td>
				</tr>
				<tr>
					<td>neutral</td>
					<td>{neutral}</td>
				</tr>
				<tr>
					<td>bad</td>
					<td>{bad}</td>
				</tr>
				<tr>
					<td>all</td>
					<td>{good + neutral + bad}</td>
				</tr>
				<tr>
					<td>average</td>
					<td>{average(good, neutral, bad)}</td>
				</tr>
				<tr>
					<td>positive</td>
					<td>{positivePercentage(good, neutral, bad)}</td>
					<td>%</td>
				</tr>
			</tbody>
		</table>
	)
}
export default StatisticTable
