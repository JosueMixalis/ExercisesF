const PersonForm = ({addToPhoneBook,newName,handleNameChange,handleNumberChange,newNumber}) => {
    return(
        <form onSubmit={addToPhoneBook}>
                <div>
                    name: <input 
                    value={newName}
                    onChange={handleNameChange} 
                    />
                </div>
                <div>
                    Number: <input 
                    value={newNumber}
                    onChange={handleNumberChange}
                     />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
    )
}

export default PersonForm;