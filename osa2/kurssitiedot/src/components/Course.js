import React from 'react'

const Course = (props) => {
    const Total = (props) => {
        let baseValue = props.course[props.number].parts[0].exercises

        const reducer = (accumulator, currentValue) => {
            baseValue += currentValue.exercises
        }

        props.course[props.number].parts.reduce(reducer)

        return (
            <div>
                <p>Number of exercises {baseValue}</p>
            </div>
        )
    }
    const Header = (props) => {

        return (
            <div>
                <h2>{props.course[props.number].name}</h2>
            </div>
        )
    }

    const Content = (props) => {

        const Part = (props) => {

            return (
                <div>
                    <p>{props.part} {props.exercises}</p>
                </div>
            )
        }

        const showParts = () => props.course[props.number].parts.map((part, i) =>
            <Part number={0} key={part.id} part={props.course[props.number].parts[i].name} exercises={props.course[props.number].parts[i].exercises} />
        )

        return (
            <div>
                {showParts()}
            </div>
        )
    }

    const showContent = () => props.course.map(function (cour, i) {
        return (
            <div>
                <Header number={i} course={props.course} />
                <Content number={i} course={props.course} />
                <Total number={i} course={props.course} />
            </div>
        )
    })

    return (
        <div>
            {showContent()}
        </div>
    )
}
export default Course