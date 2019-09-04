import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text} </td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    let positivePercentage = (good) / (good + neutral + bad) * 100
    let average = (good - bad) / (good + neutral + bad)

    if (isNaN(average)) {
        return (
            <tbody><tr><td>No feedback given</td></tr></tbody>
        )
    }
    return (
        <tbody>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="average" value={average} />
            <Statistic text="positive(%)" value={positivePercentage} />
        </tbody>
    )

}
const Buttons = (props) => {

    return (
        <div>
            <Button text={props.textGood} value={props.good} operation={props.setGood} />
            <Button text={props.textNeutral} value={props.neutral} operation={props.setNeutral} />
            <Button text={props.textBad} value={props.bad} operation={props.setBad} />
        </div>
    )
}

const Button = ({ text, value, operation }) => {

    return (
        <button onClick={() => operation(value + 1)}>{text}</button>
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <div>
                <h2>Give feedback</h2>
                <Buttons
                    textGood="good" textNeutral="neutral" textBad="bad"
                    good={good} setGood={setGood}
                    neutral={neutral} setNeutral={setNeutral}
                    bad={bad} setBad={setBad}
                />
            </div>
            <h2>Statistics</h2>
            <table>
                <Statistics good={good} neutral={neutral} bad={bad} />
            </table>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)