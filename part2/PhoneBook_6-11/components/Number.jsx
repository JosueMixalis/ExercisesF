const Number = ({ persona, deletePhone }) => {
    return <li>{persona.name} {persona.number} <button onClick={() => deletePhone()}>Delete</button></li>;
};

export default Number;