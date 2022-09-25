import axios from "axios";

const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl)

const create = newPerson => axios.post(baseUrl, newPerson)

const update = (id, modPerson) => axios.put(`${baseUrl}/${id}`, modPerson)

const remove = id => axios.delete(`${baseUrl}/${id}`)

export default { getAll, create, update, remove }
