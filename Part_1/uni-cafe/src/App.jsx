import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>)
}

const Statistics = ({good, neutral, bad}) => {

  const total = good+neutral+bad;

  if (total === 0){
    return <p>No feedback given</p>
  }
  
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text={'good'} value={good} />
          <StatisticLine text={'neutral'} value={neutral} />
          <StatisticLine text={'bad'} value={bad} />
          <StatisticLine text={'total'} value={total} />
          <StatisticLine text={'average'} value={(good-bad)/(total)} />
          <StatisticLine text={'positive'} value={`${good/total*100}%`} />
        </tbody>
      </table>
    </div>
  )
}

const Button = ({text, onClick}) => {
  return <button onClick={onClick}>{text}</button>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
  <div>
    <h1>give feedback</h1>
    <Button onClick={() => setGood(good+1)} text={'good'} />
    <Button onClick={() => setNeutral(neutral+1)} text={'neutral'} />
    <Button onClick={() => setBad(bad+1)} text={'bad'} />
    
    <Statistics good={good} bad={bad} neutral={neutral} />
  </div>)
}

export default App