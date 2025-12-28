const mongoose = require('mongoose')
require('dotenv').config()
const argsLen = process.argv.length

// if (argsLen < 3)
// {
//     console.log('you must provide password')
//     process.exit(1)
// }

// const password = process.argv[2]

// const url = 
//     `mongodb+srv://adrianchervinchuk1_db_user:${password}@cluster0.zwycskc.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

const url = process.env.MONGO_URI

mongoose.set('strictQuery', false)

mongoose.connect(url, {family: 4})

const contactSchme = {
    name: String,
    number: String
}

const Contact = mongoose.model('Contact', contactSchme)

const listAllContacts = () => {
    Contact.find({}).then(res => {

        let anyDocs = false
        res.forEach(doc => {
            console.log(doc.name, doc.number)
            anyDocs = true
        })
        if (!anyDocs){
            console.log(`no documents found in '${Contact.collection.name}' collection`)
        }
        mongoose.connection.close()
    })
}

const addNewContact = (name, number) => {
    const newContact = new Contact({name, number})
    newContact.save().then(res => {
        console.log(`added ${res.name} number ${res.number} to phonebook`)
        mongoose.connection.close()
    })
}

if (argsLen < 3){
    listAllContacts()
}
else if (argsLen > 3) {
    const name = process.argv[3]
    const number = argsLen > 4 ? process.argv[4] : null
    addNewContact(name, number)
}
else{
    console.log('nofin\'...')
}

