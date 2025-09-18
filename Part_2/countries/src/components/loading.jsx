import {useState} from 'react'

const Loading = () => {
    const [waiting, setWaiting] = useState('.')
    
    setTimeout(() => (waiting.length >= 4 
      ? setWaiting('.') 
      : setWaiting(`${waiting}.`)),
      300
    )

    return <h2>{waiting}</h2>
}

export default Loading