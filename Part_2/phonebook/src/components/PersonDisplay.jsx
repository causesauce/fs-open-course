
const SignlePersonDisplay = ({name, id, number}, handleDelete) => {
    return (
        <p key={id}>
            {name} {number} <button  onClick={() => handleDelete(id)}>delete</button>
        </p>
    )
}

const PersonListDisplay = ({persons, handleDelete}) => {
    return (
        <div>
            {persons.map(person => SignlePersonDisplay(person, handleDelete))}
        </div>
    )
}

export default PersonListDisplay