
const Notification = ( { message }) => {
    
    if (message == null) return
    
    const {text, isError} = message
    const cssClass = isError ? "error" : "success"

    return (
        <div className={cssClass}>
            <h2>{text}</h2>
        </div>
    )
}

export default Notification