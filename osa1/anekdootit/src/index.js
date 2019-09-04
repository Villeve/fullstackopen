import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Buttons = (props) => {

    const voteHandler = () => {
        votes[props.selected]++
        props.setPoints(votes[props.selected])
    }

    const switchHandler = () => {
        let random = () => Math.floor(Math.random() * Math.floor(6))
        while (random() === props.random) random()
        props.setSelected(random)
    }

    return (
        <div>
            <button onClick={switchHandler}>next anecdote</button>
            <button onClick={voteHandler}>vote</button>
        </div>
    )
}

const MostVotes = (props) => {
    let max = Math.max(...votes);
    let pos = votes.indexOf(max)
    return (
        <p>
            {anecdotes[pos]}
        </p>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(0)

    return (
        <div>
            <Buttons
                selected={selected} setSelected={setSelected} votes={props.votes} points={points} setPoints={setPoints}
            />
            <h1>Anecdote of the Day</h1>
            {props.anecdotes[selected]}
            <p>Has {props.votes[selected]} votes.</p>
            <h1>Anecdote with Most Votes</h1>
            <MostVotes />

        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const votes = [0, 0, 0, 0, 0, 0]

ReactDOM.render(
    <App anecdotes={anecdotes} votes={votes} />,
    document.getElementById('root')
)