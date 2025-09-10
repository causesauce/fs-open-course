import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonListDisplay from './components/PersonDisplay'

import personService from './services/persons'

const App = () => {
  const [filter, setFilter] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService.getAll().then(data => setPersons(data))
  }, [])

  const handleNewPersonSubmit = (newPerson) => {
    const personIndex = persons.findIndex(p => p.name === newPerson.name)
    if (personIndex < 0){
      personService.createOne(newPerson)
        .then(data => setPersons(persons.concat(data)))
      return true
    }

    const oldPerson = persons[personIndex]
    const userResponse = window.confirm(
      `Update the number for existing person ${oldPerson.name} ?`)

    if (!userResponse) return false

    personService.updateOne(newPerson, oldPerson.id)
      .then(data => {
        setPersons(persons.map(p => p.id === oldPerson.id ? data : p))
      })

      return true
  }

  const handlePersonDelete = (id) => {
    const personToDelete = persons.find(p => p.id === id)

    if (!personToDelete) return

    const userResponse = window.confirm(`Delete person ${personToDelete.name} ?`)

    if (!userResponse) return

    personService.deleteOne(id)
      .then(r => 
        {
          setPersons(persons.filter(p => p.id !== id))
        })
  }

  const getFilteredValues = () => {
    if (filter === ''){
      return persons
    }

    const filterLower = filter.toLowerCase()
    return persons.filter(p => p.name.toLowerCase().includes(filterLower))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm handleNewPersonSubmit={handleNewPersonSubmit} />
      <h2>Numbers</h2>
      <PersonListDisplay persons={getFilteredValues()} handleDelete={handlePersonDelete} />
    </div>
  )
}

export default App