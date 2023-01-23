import "./App.css";
import "./index.css";
import Places from "./pages/admin/Places";
import Login from "./pages/Login";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Users from "./pages/admin/Users";
import Browse from "./pages/Browse";
import Details from "./pages/Details";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Transactions from "./pages/Transactions";
import AddPlace from "./pages/users/AddPlace";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/dashboard" element={<Places/>} />
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
