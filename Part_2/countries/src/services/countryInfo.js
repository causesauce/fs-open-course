import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    return axios.get(`${baseUrl}/all`)
        .then(response => response.data)
}

const getOneByName = (countryName) => {
    return axios.get(`${baseUrl}/all/name/${countryName}`)
        .then(response => response.data)
}

export default {getAll, getOneByName}