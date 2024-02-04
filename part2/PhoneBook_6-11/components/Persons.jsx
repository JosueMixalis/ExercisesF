import Number from "./Number.jsx";

const Persons = ({ phonesToShow, deletePhone }) => {
    return (
        <ul>
            {phonesToShow.map(phone => (
                <Number key={phone.id} persona={phone} deletePhone={() => deletePhone(phone.id, phone.name)} />
            ))}
        </ul>
    );
};

export default Persons;