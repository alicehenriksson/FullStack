import { useState } from 'react'

const Persons = ({name}) => (<div>{name}</div>)

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '090820380850',
    }
  ]) 
  const [newName, setNewName] = useState('')

  const addInput = (event) => {
    event.preventDefault()
    const input = {
      name: newName
    }
    if (persons.some(e => e.name === newName)) {
      alert(`${newName} is already taken!`)
      setNewName('')
      return
    }
    setPersons(persons.concat(input))
    setNewName('')
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addInput}>
        <div>
          name: <input value={newName} onChange={handleNoteChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person =>
          <Persons key={person.name} name={person.name}/>
        )}
    </div>
  )
}

export default App