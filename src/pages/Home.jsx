import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Context, server } from "../main";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TodoCard = ({ id, title, description, IsCompleted, createdAt, updateHandler, deleteHandler }) => {
  return (
    <div className="card">
      <p className="createdAt">{createdAt}</p>
      <p className="title">{title}</p>
      <p className="text">{description}</p>
      <div className="manipulator">
        <input type="checkbox" onChange={() => { updateHandler(id) }} checked={IsCompleted} id="checkBox" />
        <button className="btn" onClick={() => { deleteHandler(id) }}>DELETE</button>
      </div>
    </div>
  )
}




const Home = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const {setLoading,loading} = useContext(Context) //instead of doing this create a new loading and set loading since it is loading for user and if it will be changed header loader will also change which will cause bad bahaviour of the webpage
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/task/new`,
        { title, description },
        {
          headers: {
            "Content-Tpe": "application/json",
          },
          withCredentials: true, //write terms in right spelling -->dont write withCredential
        }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setRefresh((prev) => !prev);
      setLoading(false);
    }
  };

  const updateHandler = async (id) => {
    const { data } = await axios.put(`${server}/task/${id}`);
    setRefresh((prev) => !prev);
    toast.success("Task Updated");
  };

  const deleteHandler = async (id) => {
    const { data } = await axios.delete(`${server}/task/${id}`);
    setRefresh((prev) => !prev);
    toast.error("Task delete");
  };

  useEffect(() => {
    axios
      .get(`${server}/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });

    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [refresh, isAuthenticated]);

  return (
    <>
      <div className="login">
        <h1>Create Task</h1>
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              required
              placeholder="Task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="Text"
              required
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button disabled={loading} type="submit">
              Create
            </button>
          </form>
        </section>

        <h1 align="center">YOUR TASKS</h1>
        <div className="content">
          {tasks.map((i) => (
            <TodoCard
              key={i._id}
              id={i._id}
              title={i.title}
              description={i.description}
              IsCompleted={i.isCompleted}
              createdAt={i.createdAt}
              updateHandler={updateHandler}
              deleteHandler={deleteHandler}
            />
          ))}
        </div>

      </div>

    </>
  );
};

export default Home;
