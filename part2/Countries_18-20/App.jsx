import { useState, useEffect } from "react";
import axios from 'axios';
import CountriesToShow from "./components/CountriesToShow";


const App = () => {
    
    const [country, setCountry] = useState('re');
    const [allCountries, setAllCountries] = useState([]);

    useEffect(() => {
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
            .then(response => {
                setAllCountries(response.data)
            })
    }, [])



    const handleChange = (event) => {
        setCountry(event.target.value)
    }

    return (
        <div>
            <form>
                find countries 
                <input type="text" value={country} onChange={handleChange} />
            </form>
            <CountriesToShow allCountries={allCountries}  country={country}/>
        </div>
    )
}

export default App;
