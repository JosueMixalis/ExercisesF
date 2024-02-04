import Part from "./Part";

const Content = ({parts}) => {
    return (
      <div>
        {parts.map((value,index) => (
          <Part key={index} part={value.name} exercises={value.exercises} />
        ))}
      </div>
    );
  }

  export default Content;