import axios from 'axios';

const baseUrl = `http://localhost:3001/persons`

const getPersons  = () => {
    const request = axios.get(baseUrl)
    return request.then( response => response.data );
}

const create = (phoneObject) => {
    const request = axios.post(baseUrl,phoneObject)
    return request.then(response => response.data);
}

const deletePerson = (id) => {
    try {
        const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
    } catch (error) {
        console.log("Ocurrio el error"+error);
    }
}

const updatePhoneNumber = (id,newPersona) => {
    const request = axios.put(`${baseUrl}/${id}`,newPersona)
    return  request.then(response => response.data)
}

export default {getPersons,create,deletePerson,updatePhoneNumber}