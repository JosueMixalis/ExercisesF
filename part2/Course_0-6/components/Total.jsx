const Total = ({parts}) =>  <h3>Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}</h3>

export default Total;

