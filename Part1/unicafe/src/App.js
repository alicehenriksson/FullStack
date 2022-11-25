import { useState } from 'react'

//Display statisctic
const StatiscticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)
//Display button
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.btnName}
  </button>
)
//Calculate statistics and check if no feedback given
const Statistics = (props) => {
  //Calculation
  const posPercentage = (100*props.good/(props.good+props.neutral+props.bad)+" %")
  const average = (props.good/(props.good+props.bad+props.neutral))-(props.bad/(props.good+props.bad+props.neutral))
  const all = props.good+props.neutral+props.bad
  //Check for feedback
  if (all === 0) {
    return "No feedback given"
  } else {
    return (
      //To avoid warnings table and tbody are needed
      <div>
        <table>
          <tbody>
            <StatiscticLine text="Good: " value={props.good} />
            <StatiscticLine text="Neutral: " value={props.neutral} />
            <StatiscticLine text="Bad: " value={props.bad} />
            <StatiscticLine text="All: " value={all} />
            <StatiscticLine text="Average: " value={average} />
            <StatiscticLine text="Positive: " value={posPercentage} />
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  // Save clicks of each button to its own state
  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad,setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good+1)} btnName="Good" />      
      <Button handleClick={() => setNeutral(neutral+1)} btnName="Neutral" />      
      <Button handleClick={() => setBad(bad+1)} btnName="Bad" />      
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App