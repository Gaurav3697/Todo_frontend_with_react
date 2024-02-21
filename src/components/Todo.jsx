import React from "react";

//creating todo components and the argument are cong from home page 
const Todo = ({id, title, description, IsCompleted, createdAt,updateHandler,deleteHandler}) => {
  return (
    <div id="todoItemContainer">
      <span>{createdAt}</span>
      <div className="content">
      <h2>{title}</h2>
      <p >{description}</p>
      </div>
      <div className="manipulator">
      <input type="checkbox" onChange={()=>{updateHandler(id)}} checked={IsCompleted} id="checkBox" />
      <button className="btn" onClick={()=>{deleteHandler(id)}}>DELETE</button>
    </div>
     </div>

  );
};

export default Todo;