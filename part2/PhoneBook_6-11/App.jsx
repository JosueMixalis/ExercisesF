import {useEffect, useState} from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phoneService from './services/notes';
import Notification from './components/Notification';

const App = () => {

    const [personas, setPersonas] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newFilter, setNewFilter] = useState('');
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [color, setColor] = useState({})
    useEffect(() => {
        phoneService
            .getPersons()
            .then(response => {
                setPersonas(response)
            });
    },[])

    const addToPhoneBook = (event) => {
        event.preventDefault();
        if(newNumber.length === 0 || newName.length === 0) {
            window.alert("You must fill name and number");
            return;
        }
        if(personas.some(persona => persona.number === newNumber)){
            window.alert(`the phone number ${newNumber} is alredy added to phonebook`)
            return;
        }
        if(personas.some(persona => persona.name === newName)){
            updateNumber(newName,newNumber);
            return;
        }
        const phoneObject = {
            name: newName,
            number: newNumber,
        }
        phoneService
            .create(phoneObject)
            .then(response => {
                setPersonas( personas.concat(response))
                setNewName('');
                setNewNumber('');
                setNotificationMessage(`Added ${newName}`)
                setColor({color: 'green'}) 
                setTimeout(() => {
                    setNotificationMessage(null)
                },5000)
            }) 
    }

    const deletePersonHandler = (id,persona) => {
        if(window.confirm(`Delete ${persona}?`)){
            phoneService
            .deletePerson(id)
            .then(() => setPersonas(personas => personas.filter(persona => persona.id !== id)))
            .catch(error => {
                if(error.response && error.response.status === 404){
                    setNotificationMessage( `the person '${persona}' was already deleted from server `)
                    setColor({color: 'red'}) 
                    setTimeout(()=>setNotificationMessage(null),5000)
                }
                  setPersonas(personas.filter(persona => persona.id !== id))
            })
        }else{
            alert(`you have cancel the delete action`)
        }

    }


    const updateNumber = (name,newNumber) => {
        if(window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)){
            const persona =  personas.find( persona => persona.name === name)
            const changedNumber = {...persona, number: newNumber}
            phoneService
                .updatePhoneNumber(persona.id,changedNumber)
                .then(response => {
                    setPersonas(personas.map(persona => persona.name !== name  ? persona : response))
                })  
                .catch(error => {
                    if(error.response && error.response.status===404){
                        setNotificationMessage( `the person '${newName}' was already deleted from server `)
                        setColor({color: 'red'}) 
                        setTimeout(()=>setNotificationMessage(null),5000)
                    }
                })
        }   
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value);
    }



    const phonesToShow = 
        newFilter.length === 0 ?
        personas : 
        personas.filter(persona => persona.name.toLowerCase().includes(newFilter.toLowerCase()));
    
    return (
        <div>
            <h2>PhoneBook</h2>
            <Notification message={notificationMessage} color={color}/>
            <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
            <h2>Add a new</h2>
            <PersonForm newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange}
            addToPhoneBook={addToPhoneBook} handleNameChange={handleNameChange}/>
            <h2>Number</h2>
            <Persons phonesToShow={phonesToShow} deletePhone={deletePersonHandler}/>
        </div>
    )
}

export default App;