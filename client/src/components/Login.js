import React from "react";
import { useState } from "react";
import { Nav, NavLink } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/login.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let res = await fetch("http://localhost:3030/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const token = await res.json();
    res = await fetch("http://localhost:3030/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Token": token.accessToken,
        "Refresh-Token": token.refreshToken,
      },
    });

    let response = await res.json();
    if (response.message == "success") {
      navigate("/dashboard");
      window.sessionStorage.setItem(
        "accessToken",
        token.accessToken.toString()
      );
      window.sessionStorage.setItem(
        "refreshToken",
        token.refreshToken.toString()
      );
      window.sessionStorage.setItem("userID", response.user.Value.id_user);
    } else {
      alert("Your username or password is invalid");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="relative">
        <img className="w-full h-full object-cover" src={loginImg} alt="canals" />
        <h3 class="absolute text-lg text-slate-300 bottom-5 left-5">Picture by Pierre Blaché</h3>
      </div>
      <div className="bg-gray-800 flex flex-col justify-center">
        <h2 className="text-4xl mb-5 dark:text-white font-bold text-center">
          🏕️ Welcome to Binbi!
        </h2>
        <form
          className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl dark:text-white font-bold text-center">
            Login
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Username</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <input
              className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between text-gray-400 py-2">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" /> Remember Me
            </p>
            <p>Forgot Password</p>
          </div>
          <button className="w-full mt-5 mb-2 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
            Login
          </button>
          <center>
            <Link to="/register">Don't have an account? Register</Link>
          </center>
        </form>
      </div>
    </div>
  );
};

export default Login;
