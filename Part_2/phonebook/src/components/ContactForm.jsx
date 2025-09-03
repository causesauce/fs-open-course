import {useState} from 'react'

const ContactForm = ({onContactSubmit, id}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setnewNumber] = useState('')
  
    const hadleNewNameChange = (event) => {
        setNewName(event.target.value)
    }
    
    const handleNewNumberChange = (event) => {
        setnewNumber(event.target.value)
    }

    const handleOnSubmit = (event) => {
        event.preventDefault()

        onContactSubmit({name: newName, number: newNumber, id: id})

        setNewName('')
        setnewNumber('')
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <div>
                name: <input value={newName} onChange={hadleNewNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNewNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default ContactForm