//part 1.6 to part 1.12
import {useState} from "react";

const Button = ({handleClick,text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Subtitle = ({message}) => <h2>{message}</h2>


const StatisticLine = ({text,value}) =>{
  return(
   <tr>
      <td>{text}</td>
      <td>{value}</td>
   </tr>
  )
}

const Statics = ({good,bad,neutral}) => {
  const all = (good+bad+neutral)
  const average =  (good+bad*-1)/all
  const positive = (good/all)*100
  if(all === 0){
    return(
      <div>
      <Subtitle message="statistics"/>
      No feedback given
      </div>
    )
  }
  return (
    <div>
      <Subtitle message="statistics"/>
      <table>
        <thead>
          <tr>
            <th>Comentaries</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good+neutral+bad}/>
          <StatisticLine text="average" value={average}/>
          <StatisticLine text="positive" value={positive+" %"}/>
        </tbody>
      </table>   
    </div>
  )
}


const App = () =>{
const [good,setGood] = useState(0)
const [neutral,setNeutral] = useState(0)
const [bad,setBad] = useState(0)


const setValueGood = () => {
  setGood(good+1)
}
const setValueNeutral = () => {
  setNeutral(neutral+1)
}
const setValueBad = ()  => {
  setBad(bad+1)
}


return(
  <div>
    <h1>give feedback</h1>
    <Button handleClick={setValueGood} text="Good" />
    <Button handleClick={setValueNeutral} text="Neutral" />
    <Button handleClick={setValueBad} text="Bad" />
    <Statics good={good} bad={bad} neutral={neutral} />
  </div>
)

}

export default App;