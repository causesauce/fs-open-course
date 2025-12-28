
const SignleContactDisplay = ({name, id, number}, handleDelete) => {
    return (
        <p key={id}>
            {name} {number} <button  onClick={() => handleDelete(id)}>delete</button>
        </p>
    )
}

const ContactListDisplay = ({contacts, handleDelete}) => {
    return (
        <div>
            {contacts.map(contact => SignleContactDisplay(contact, handleDelete))}
        </div>
    )
}

export default ContactListDisplay