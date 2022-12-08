import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

//Get all data
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

//Create new
const create = newObject => {
    const request = axios.post(baseUrl,newObject)
    return request.then(response => response.data)
}

// Delete an element
const remove = objectId => {
    const request = axios.delete(`${baseUrl}/${objectId}`)
    return request.then(response => response.data)
}

//Update number
const update = (objectId,newData) => {
    const request = axios.put(`${baseUrl}/${objectId}`,newData)
    return request.then(response => response.data)
}

export default {getAll, create, remove, update}