import axios from 'axios'
const baseUrl = '/api/contacts'

const getDataFromResponse = (promise) => 
    promise
        .then(response => response?.data)

const getAll = () => 
    getDataFromResponse(axios.get(baseUrl))

const createOne = (contact) => 
    getDataFromResponse(axios.post(baseUrl, contact))

const updateOne = (contact, id) => 
    getDataFromResponse(axios.put(`${baseUrl}/${id}`, contact))

const deleteOne = (id) =>
    axios.delete(`${baseUrl}/${id}`)

export default {getAll, createOne, updateOne, deleteOne}