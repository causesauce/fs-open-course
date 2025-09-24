const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.static('dist'))
app.use(express.json())

morgan.token('jsonBody', (req, res) => {
    if (req.method === 'POST' && req.body){
        return JSON.stringify(req.body)
    }
})

const morganFormat = 
        ':method :url :status :res[content-length] - :response-time ms :jsonBody'

app.use(morgan(morganFormat))

let personsData = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const getNewUniqueId = () => {
    let newId = Math.floor(Math.random() * 100_000)

    while(personsData.findIndex(p => p.id === newId) >= 0){
        newId = Math.floor(Math.random() * 100_000)
    }

    return newId
}

app.get('/api/persons', (req, resp) => {
    resp.send(personsData)
})

app.get('/api/info', (req, resp) => {
    const requestDateTime = Date()
    const info = 
    `<p>Phonebook has info for ${personsData.length} people</p>
    <p>${requestDateTime}</p>`

    resp.send(info)
})

app.get('/api/persons/:id', (req, resp) => {
    const id = req.params.id

    const person = personsData.find(p => p.id === id)

    if (!person){
        resp.status(404)
        resp.statusMessage = 'No Person found' 
        return resp.end()
    }

    resp.send(person)
})

app.delete('/api/persons/:id', (req, resp) => {
    const id = req.params.id

    personsData = personsData.filter(p => p.id !== id)

    resp.status(204).end()
})

app.post('/api/persons', (req, resp) => {
    const body = req.body

    if (!body.name){
        return resp.status(400).send({error: "name cannot be empty"})
    }

    if (!body.number){
        return resp.status(400).send({error: "number cannot be empty"})
    }

    if (personsData.findIndex(p => p.name === body.name) >= 0){
        return resp.status(400).send({error: "entry with the same name already exists"})
    }

    const newPerson = {
        id: String(getNewUniqueId()),
        name: body.name,
        number: body.number
    }

    personsData.push(newPerson)

    resp.send(newPerson)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{
    console.log(`Phonebook server is running on port ${PORT}`)
})