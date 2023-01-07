import { useState } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    id_user: Math.ceil(Math.random() * (10000 - 1)).toString(),
    username: "",
    password: "",
    nama_depan: "",
    nama_belakang: "",
    no_telp: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3030/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        alert("Registration successful");
      } else if (response.status === 500) {
        alert("Username already exists");
      } else {
        alert("Something went wrong");
      }
    });
  };
  return (
    <div>
      <div className="bg-gray-800 flex flex-col justify-center h-screen">
        <h2 className="text-4xl mb-5 dark:text-white font-bold text-center">
          🏕️ Glad to have you here!
        </h2>
        <div className="max-w-[1000px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8 ">
          <form
            className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8 "
            onSubmit={handleSubmit}
          >
            <h2 className="text-4xl dark:text-white font-bold text-center">
              Register
            </h2>
            <div className="max-w-[400px] flex flex-col text-gray-400 py-2">
              <label>Username</label>
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
                value={data.username}
                onChange={(e) => {
                  setData((state) => ({
                    ...state,
                    username: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="max-w-[400px] flex flex-col text-gray-400 py-2">
              <label>Password</label>
              <input
                className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="password"
                value={data.password}
                onChange={(e) => {
                  setData((state) => ({
                    ...state,
                    password: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="max-w-[400px] flex flex-col text-gray-400 py-2">
              <label>First Name</label>
              <input
                className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
                value={data.nama_depan}
                onChange={(e) => {
                  setData((state) => ({
                    ...state,
                    nama_depan: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="max-w-[400px] flex flex-col text-gray-400 py-2">
              <label>Last Name</label>
              <input
                className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
                value={data.nama_belakang}
                onChange={(e) => {
                  setData((state) => ({
                    ...state,
                    nama_belakang: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="max-w-[400px] flex flex-col text-gray-400 py-2">
              <label>Phone Number</label>
              <input
                className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="number"
                min="0"
                value={data.no_telp}
                onChange={(e) => {
                  setData((state) => ({
                    ...state,
                    no_telp: e.target.value,
                  }));
                }}
              />
              <label>e.g. 081212332123</label>
            </div>
            <button className=" max-w-[400px] w-full mt-5 mb-2 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
              Register Now
            </button>
            <center>
              <Link to="/">Already have an account? Login</Link>
            </center>
          </form>
        </div>
      </div>
      {/* OLD
      <form onSubmit={handleSubmit}>
        <div className="form-group m-5 me-5 ms-5 pe-5 ps-5">
          <h3 className="mb-3">Register</h3>
          <label>ID User</label>
          <input
            type="text"
            className="form-control mt-1"
            readOnly="true"
            value={data.id_user}
            onChange={(e) => {
              setData((state) => ({
                ...state,
                id_user: e.target.value,
              }));
            }}
          />
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              value={data.username}
              onChange={(e) => {
                setData((state) => ({
                  ...state,
                  username: e.target.value,
                }));
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="text"
              className="form-control mt-1"
              value={data.password}
              onChange={(e) => {
                setData((state) => ({
                  ...state,
                  password: e.target.value,
                }));
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Nama Depan</label>
            <input
              type="text"
              className="form-control mt-1"
              value={data.nama_depan}
              onChange={(e) => {
                setData((state) => ({
                  ...state,
                  nama_depan: e.target.value,
                }));
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Nama Belakang</label>
            <input
              type="text"
              className="form-control mt-1"
              value={data.nama_belakang}
              onChange={(e) => {
                setData((state) => ({
                  ...state,
                  nama_belakang: e.target.value,
                }));
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>No. Telp</label>
            <input
              type="text"
              className="form-control mt-1"
              value={data.no_telp}
              onChange={(e) => {
                setData((state) => ({
                  ...state,
                  no_telp: e.target.value,
                }));
              }}
            />
          </div>

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <center>
            <Link className="d-grid gap-2 mt-3" to="/">
              Login
            </Link>
          </center>
        </div>
      </form> */}
    </div>
  );
};

export default Register;
