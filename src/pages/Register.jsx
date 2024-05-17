import React, { useContext, useState } from "react";
import { Link , Navigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated, setIsAuthenticated, loading ,setLoading} = useContext(Context);

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      console.log("Register submitHandler")
      const { data } = await axios.post(
        `${server}/users/new`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true)
      setLoading(false);
    } catch (error){
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
    }
  };

  if(isAuthenticated) return <Navigate to={"/"}/>
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />

          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" >Sign Up</button>
          <h4>Or</h4>
          <Link to="/Login">Log In</Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
