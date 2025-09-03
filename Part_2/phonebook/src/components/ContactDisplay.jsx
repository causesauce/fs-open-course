
const SignleContactDisplay = ({name, id, number}) => {
    return (
        <p key={id}>{name} {number}</p>
    )
}


const ContactListDisplay = ({contacts}) => {
    return (
        <div>
            {contacts.map(SignleContactDisplay)}
        </div>
    )
}

export default ContactListDisplay