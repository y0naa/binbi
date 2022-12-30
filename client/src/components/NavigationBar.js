import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../logo.png";

const NavigationBar = () => {
  const userID = window.sessionStorage.getItem("userID");
  function isAdminView() {
    if (userID == "01") {
      return (
        <Nav.Link>
          <NavLink to="/users">Users</NavLink>
        </Nav.Link>
      );
    } else {
      return (
        <Nav fill variant="tabs">
          <Nav.Link>
            <NavLink to="/transactions">Transactions</NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink to="/orders">Orders</NavLink>
          </Nav.Link>
        </Nav>
      );
    }
  }
  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand>
            <img src={logo} alt="logo" className="me-5" />
            BINBI
          </Navbar.Brand>
          <Nav fill variant="tabs">
            {isAdminView()}
            
            <Nav.Link>
              <NavLink  to={"/dashboard"}>Places</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to="/profile">Profile</NavLink>
            </Nav.Link>

            <Nav.Link>
              <NavLink to="/" className="text-danger">Logout</NavLink>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
