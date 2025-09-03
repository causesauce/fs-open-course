import { useState } from 'react'

import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import ContactListDisplay from './components/ContactDisplay'

const App = () => {
  const [filter, setFilter] = useState('')

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const handlContacteSubmit = (contact) => {
    if (persons.findIndex(p => p.name === contact.name) >= 0){
      alert(`${contact.name} is already added to the phonebook`)
      return
    }

    setPersons([contact, ...persons])
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
      <ContactForm onContactSubmit={handlContacteSubmit} id={persons.length+1}/>
      <h2>Numbers</h2>
      <ContactListDisplay contacts={getFilteredValues()} />
    </div>
  )
}

export default App