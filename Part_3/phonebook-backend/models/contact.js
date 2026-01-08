const mongoose = require('mongoose')

const url = process.env.MONGO_URI

mongoose.set('strictQuery', false)

mongoose.connect(url, {family: 4})
    .then(() => console.log('connected to mongo'))
    .catch(err => console.log('error connecting to mongo:', err.message))

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: {
            validator: (num) => /\d{2,3}-\d{5,}/.test(num),
            message: 'must contain 8 or more digits and have first 2 or 3 digits separated with a dash (e.g., 123-45678)'
        }
    }
})

personSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

module.exports = mongoose.model('Contact', personSchema)
