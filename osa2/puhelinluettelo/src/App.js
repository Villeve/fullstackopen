import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './App.css'

const Persons = ({ newFilter, persons, setPersons, setErrorMessage }) => {
  const divStyle = {
    display: 'inline'
  }

  const filterPhonebook = (filterText) =>
    persons.filter(person => person.name.includes(filterText) === true)

  const removePerson = (id, name) => {
    const result = window.confirm(`Delete ${name}?`)
    if (result) {
      personService.remove(id).then(response => {
        setErrorMessage(
          `Removed ${name}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

      const filteredPersons = persons.filter(e => {
        return e.id !== id
      })
      setPersons(filteredPersons)
    }
  }

  const printPersons = () => filterPhonebook(newFilter).map((person, i) =>
    <div key={i}>
      <button style={divStyle} onClick={() => removePerson(person.id, person.name)}>Remove</button>
      <p style={divStyle}>{person.name} {person.number}</p>
    </div>
  )

  return (
    <div>
      {printPersons()}
    </div>
  )
}

const Filter = ({ newFilter, handleFilterChange }) => {

  return (
    <div>
      Filter: <input value={newFilter} onChange={handleFilterChange} />
    </div>
  )
}

const Form = ({ newName, handleNameChange, newNumber, handleNumberChange, addName }) => {

  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={addName}>add</button>
      </div>
    </form>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (e) => {
    e.preventDefault()
    const getRand = () => Math.floor(Math.random() * Math.floor(10000000))

    const personObject = {
      name: newName,
      number: newNumber,
      id: getRand()
    } // Tilapäisratkaisu, vaatii ID:n tarkistuksen, toki epätodennäköistä että päällekäisyyksiä tulee

    const checkName = (e) => e.name === newName

    if (persons.find(checkName) !== undefined) {
      const result = window.confirm(`${newName} is already added to phonebook. Replace the old number with new one?`)
      if (result) {
        persons.forEach((person, id) => {
          if (person.name === newName) {
            const updatedObject = {
              name: person.name,
              number: newNumber,
              id: person.id
            }
            persons[id] = updatedObject
            personService.update(person.id, updatedObject).then(response => {
              setErrorMessage(
                `Modified the number of ${updatedObject.name}`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
            setPersons(persons)
          }
        })
      }
    }
    else {
      setPersons(persons.concat(personObject))
      personService.create(personObject).then(response => {
        setErrorMessage(
          `Added ${personObject.name}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (e) => {
    console.log('Handling name change...', e.target.value)
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    console.log('Handling number change...', e.target.value)
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    console.log('Handling filter change...', e.target.value)
    setNewFilter(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h2>Add new contact</h2>
      <Form newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
        addName={addName}
      />

      <h2>Numbers</h2>
      <Persons newFilter={newFilter} persons={persons} setPersons={setPersons} setErrorMessage={setErrorMessage} />
    </div>
  )
}

export default App