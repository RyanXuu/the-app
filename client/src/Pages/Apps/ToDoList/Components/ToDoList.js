import ToDo from "./ToDo";


const ToDoList = ({data}) => {

  return (
    <div>
      {data.map(todo => {
        return (
          <ToDo todo={todo}/>
        )
      })}
    </div>
  );
}

export default ToDoList;