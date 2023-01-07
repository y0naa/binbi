import "./App.css";
import "./index.css"
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Users from "./components/Users";
import Register from "./components/Register";
import Transactions from "./components/Transactions";
import Orders from "./components/Orders";
import AddPlace from "./components/AddPlace";
import Home from "./components/Home";



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/transactions" element={<Transactions />} />
          <Route exact path="/orders" element={<Orders />} />
          <Route exact path="/addPlace" element={<AddPlace />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
