const Country = ({country,handleShow,name}) => {
    return(
        <p>{name} <button onClick={() => handleShow(country)}>show</button></p>
    )
}

export default Country;