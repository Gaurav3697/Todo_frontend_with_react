import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Context, server } from "../main";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } =useContext(Context);
  const [loading,setLoading] = useState(false);
  const [email, setEmail] = useState("gm4063420@gmail.com");
  const [password, setPassword] = useState("password");
  const navigate = useNavigate();

  //making submit handler for login
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
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
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

   useEffect(() => {
     if(isAuthenticated){
      navigate("/profile")
     }
   }, [isAuthenticated])
   

  return (
    <div className="login">
        <h1>Login</h1>
      <section>
        <form onSubmit={submitHandler}>
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
          <button disabled={loading} type="submit">
            Login
          </button>
          <h4>Or</h4>
          <Link to="/register">Sign Up</Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
