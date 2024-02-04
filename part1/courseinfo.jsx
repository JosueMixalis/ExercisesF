//part 1.0 to part 1.6
import React from "react";

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  );
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  );
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map((value,index) => (
        <Part key={index} part={value.name} exercises={value.exercises} />
      ))}
    </div>
  );
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.values.reduce((sum, value) => sum + value.exercises, 0)}</p>
    </div>
  );
}



const App = () => {
  const course = {
    name:'Half Stack application development',
    parts: [{
      name:'fundamentals of react', 
      exercises:10},
      {
      name:'Using props',
      exercises : 7},
      {
      name:'State of a component', 
      exercises: 14}]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total values={course.parts} />
    </div>
  );
}

export default App;