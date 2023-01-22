import "./App.css";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Register from "./pages/Register";
import Transactions from "./pages/Transactions";
import Orders from "./pages/Orders";
import AddPlace from "./pages/AddPlace";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import NavigationBar from "./components/NavigationBar";
import Details from "./pages/Details";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/dashboard" element={<Dashboard/>} />
          <Route exact path="/profile" element={<Profile/>} />
          <Route exact path="/users" element={<Users/>} />
          <Route exact path="/transactions" element={<Transactions/>} />
          <Route exact path="/orders" element={<Orders/>} />
          <Route exact path="/addPlace" element={<AddPlace/>} />
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="/browse" element={<Browse/>} />
          <Route exact path="/details" element={<Details/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
