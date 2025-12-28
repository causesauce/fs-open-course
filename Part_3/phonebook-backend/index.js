require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Contact = require('./models/contact')

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

app.get('/api/contacts', (req, resp) => {
    Contact.find({}).then(data => resp.json(data))
})

app.get('/api/info', (req, resp) => {
    const requestDateTime = Date()
    Contact.countDocuments({}).then(
        res => {
            const info = 
            `<p>Phonebook has info for ${res} people</p>
            <p>${requestDateTime}</p>`
            resp.send(info)
        }
    )
})

app.get('/api/contacts/:id', (req, resp, next) => {
    const id = req.params.id

    Contact.findOne({_id: id})
        .then(c => {
            if (!c){
                resp.status(404)
                resp.statusMessage = 'No Contact found'
                return resp.end()
            }
            resp.json(c)
        })
        .catch(err => next(err))
})

app.delete('/api/contacts/:id', (req, resp) => {
    const id = req.params.id
    
    Contact.deleteOne({_id: id})
        .then(result => {
            if (result && result.acknowledged && result.deletedCount > 0){
                resp.status(204)
            }
            else{
                resp.status(404)
            }

            resp.end()
        })
})

app.post('/api/contacts', (req, resp) => {
    const body = req.body

    if (!body.name){
        return resp.status(400).send({error: "name cannot be empty"})
    }

    if (!body.number){
        return resp.status(400).send({error: "number cannot be empty"})
    }

    const newContact = new Contact({
        name: body.name,
        number: body.number
    })

    newContact.save().then(savedContact => resp.json(savedContact))
})

app.put('/api/contacts/:id', (req, resp, next) => {
    const {name, number} = req.body

    Contact.findById(req.params.id)
        .then(contact => {
            if (!contact){
                return resp.status(404).end()
            }

            contact.name = name
            contact.number = number

            return contact.save().then((updatedContact) => {
                resp.json(updatedContact)
            })
        })
        .catch(err => next(err))
})

const unknownEndpoint = (req, resp) => {
    resp.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, req, resp, next) => {
    console.log(error.message)

    if (error.name === 'CastError'){
        resp.status(400).send({error: 'invalid id format'})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{
    console.log(`Phonebook server is running on port ${PORT}`)
})