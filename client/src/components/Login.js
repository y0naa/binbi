import React from "react";
import { useState } from "react";
import { Nav, NavLink } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

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
    <div>
      <form className="p-5" onSubmit={handleSubmit}>
        <div className="form-group m-5">
          <h3 className="mb-3">Login</h3>
          <label>Username</label>
          <input
            type="text"
            className="form-control mt-1"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <center>
            <Link className="d-grid gap-2 mt-3" to="/register">
              Register
            </Link>
          </center>
        </div>
      </form>
    </div>
  );
};

export default Login;
