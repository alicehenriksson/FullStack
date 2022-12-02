import {useState} from 'react'
import personsForm from './Components/Persons'

const FilterForm = ({newFilter,setNewFilter}) => {
  const handleFilterChange = (event) => setNewFilter(event.target.value)
  return (
    <form>
      <div>Filter: <input value={newFilter} onChange={handleFilterChange}></input></div>
    </form>
  )
}

const PersonForm = ({persons,setPersons,newName,setNewName,newNumber,setNewNumber}) => {
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addInput = (event) => {
    event.preventDefault()
    const input = {
      name: newName,
      number: newNumber
    }
    if (persons.some(e => e.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already taken!`)
      setNewName('')
      setNewNumber('')
      return
    }
    setPersons(persons.concat(input))
    setNewName('')
    setNewNumber('')
  } 

  return (
    <form onSubmit={addInput}>
      <div>Name: <input value={newName} onChange={handleNameChange}/></div>
      <div>Number: <input value={newNumber} onChange={handleNumberChange}/></div>
      <div><button type="submit">Add</button></div>
    </form>
  )
}

const Persons = ({persons,newFilter}) => {
  const lowerCased = newFilter.toLowerCase()
  const filtered = persons.filter(person => person.name.toLowerCase().includes(lowerCased) === true)
  return filtered.map(person =>
    <Person key={person.name} name={person.name} number={person.number}/>
  )
}

const Person = ({name,number}) => (<div>{name} {number}</div>)

//---------------------------Render App:---------------------------------

const App = () => {
  const [persons, setPersons] = useState(personsForm) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [newFilter,setNewFilter] = useState('')

  return (
    <div>
      <h1>Phonebook</h1>
        <FilterForm newFilter={newFilter} setNewFilter={setNewFilter} />
      <h2>Add new entry:</h2>
        <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers:</h2>
        <Persons persons={persons} newFilter={newFilter} />
    </div>
  )
}

export default App