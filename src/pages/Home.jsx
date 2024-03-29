import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { server } from "../main";
import axios from "axios";
import Todo from "../components/Todo";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const {setLoading,loading} = useContext(Context) //instead of doing this create a new loading and set loading since it is loading for user and if it will be changed header loader will also change which will cause bad bahaviour of the webpage
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

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
          withCredentials: true, //write terms in write spelling -->dont write withCredential
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
  }, [refresh]);

  return (
    <>
      <div className="login">
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
              Create Task
            </button>
          </form>
        </section>
      </div>
      <hr />

      <div>
        <h1 align="center">YOUR TASKS</h1>
        {tasks.map((i) => (
          <Todo
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
    </>
  );
};

export default Home;
