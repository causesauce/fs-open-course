import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getDataFromResponse = (promise) => 
    promise.then(response => response.data)

const getAll = () => 
    getDataFromResponse(axios.get(baseUrl))

const createOne = (person) => 
    getDataFromResponse(axios.post(baseUrl, person))

const updateOne = (person, id) => 
    getDataFromResponse(axios.put(`${baseUrl}/${id}`, person))


const deleteOne = (id) =>
    axios.delete(`${baseUrl}/${id}`)

export default {getAll, createOne, updateOne, deleteOne}