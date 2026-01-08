import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import ContactListDisplay from './components/ContactDisplay'
import Notification from './components/Notification'
import contactService from './services/contacts'

import './index.css'

const App = () => {
  const [filter, setFilter] = useState('')
  const [contacts, setContacts] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    contactService.getAll().then(data => setContacts(data))
  }, [])

  const setMessageWithTimeout = (text, isError) => {
    setMessage({text, isError})
    const time = isError ? 10_000 : 3000
    setTimeout(() => {setMessage(null)}, time)
  }

  const handleNewContactSubmit = (newContact) => {
    const contactIndex = contacts.findIndex(p => p.name === newContact.name)
    if (contactIndex < 0){
      contactService.createOne(newContact)
        .then(data => 
          {
            setContacts(contacts.concat(data))
            setMessageWithTimeout(`Added ${data.name}`, false)
          })
          .catch(err => {
            const errorMessage = err.response.data.error
            console.log(errorMessage)
            setMessageWithTimeout(errorMessage, true)
          })
      return true
    }

    const oldContact = contacts[contactIndex]
    const userResponse = window.confirm(
      `Update the number for existing contact ${oldContact.name} ?`)

    if (!userResponse) return false

    contactService.updateOne(newContact, oldContact.id)
      .then(data => {
        setContacts(contacts.map(p => p.id === oldContact.id ? data : p))
        setMessageWithTimeout(`Updated ${data.name}`, false)
      })
      .catch(err => {
        const errorMessage = err.response.data.error
        console.log(errorMessage)
        setMessageWithTimeout(errorMessage, true)
      })

      return true
  }

  const handleContactDelete = (id) => {
    const contactToDelete = contacts.find(p => p.id === id)

    if (!contactToDelete) return

    const userResponse = window.confirm(`Delete contact ${contactToDelete.name} ?`)

    if (!userResponse) return

    contactService.deleteOne(id)
      .then(() => 
        {
          setContacts(contacts.filter(p => p.id !== id))
        })
        .catch((() => {
          const notFoundContact = contacts.find(p => p.id === id)?.name
          setMessageWithTimeout(
            `Information of ${notFoundContact} has already been removed from server`, 
            true)
          }))
  }

  const getFilteredValues = () => {
    if (contacts == null) return []

    if (filter === ''){
      return contacts
    }

    const filterLower = filter.toLowerCase()
    return contacts.filter(p => p.name?.toLowerCase()?.includes(filterLower))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <Notification message={message} />
      <h2>add a new</h2>
      <ContactForm handleNewContactSubmit={handleNewContactSubmit} />
      <h2>Numbers</h2>
      <ContactListDisplay contacts={getFilteredValues()} handleDelete={handleContactDelete} />
    </div>
  )
}

export default App