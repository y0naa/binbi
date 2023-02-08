import { Dropdown } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Divider } from "rsuite";
import "../../node_modules/rsuite/dist/rsuite.min.css";

// import assets
import avatar from "../assets/avatar.jpg";
import logo from "../assets/logo-name.png";

const NavigationBar = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const userID = window.sessionStorage.getItem("userID");
  // eslint-disable-next-line eqeqeq
  const admin = userID == "01" ? true : false;

  function displayNav() {
    if (splitLocation[1] === "") {
      return false;
    } else if (splitLocation[1] === "register") {
      return false;
    } else {
      return true;
   
    }
  }
  
 
  return  displayNav() ? (
    <nav class="sticky z-10 top-0 border-gray-200 py-0 px-0 mb-0 my-0 dark:bg-gray-900">
      <div class="flex items-center justify-between">
        <div className="flex items-center justify-evenly">
          <img src={logo} alt="logo" className="h-[32px] mx-5" />
          <ul class="flex flex-col mt-4 bg-gray-50 md:flex-row md:space-x-8  md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              {admin ? (
                <a
                  style={{ textDecoration: "none" }}
                  href="/users"
                  className={`block py-2 pl-3 pr-4  ${
                    splitLocation[1] === "users"
                      ? "text-white"
                      : "text-gray-700"
                  } rounded dark:text-gray-400 md:dark:hover:text-white`}
                >
                  Users
                </a>
              ) : (
                <a
                  style={{ textDecoration: "none" }}
                  href="/home"
                  className={`block py-2 pl-3 pr-4  ${
                    splitLocation[1] === "home" ? "text-white" : "text-gray-700"
                  } rounded dark:text-gray-400 md:dark:hover:text-white`}
                >
                  Home
                </a>
              )}
            </li>
            <li>
              {admin ? (
                <a
                  style={{ textDecoration: "none" }}
                  href="/dashboard"
                  className={`block py-2 pl-3 pr-4  ${
                    splitLocation[1] === "dashboard"
                      ? "text-white"
                      : "text-gray-700"
                  } rounded dark:text-gray-400 md:dark:hover:text-white`}
                >
                  Places
                </a>
              ) : (
                <a
                  style={{ textDecoration: "none" }}
                  href="/browse"
                  className={`block py-2 pl-3 pr-4  ${
                    splitLocation[1] === "browse"
                      ? "text-white"
                      : "text-gray-700"
                  } rounded dark:text-gray-400 md:dark:hover:text-white`}
                >
                  Browse
                </a>
              )}
            </li>

            <li>
              {admin ? (
                <div></div>
              ) : (
                <a
                  style={{ textDecoration: "none" }}
                  href="/transactions"
                  className={`block py-2 pl-3 pr-4  ${
                    splitLocation[1] === "transactions"
                      ? "text-white"
                      : "text-gray-700"
                  } rounded dark:text-gray-400 md:dark:hover:text-white`}
                >
                  Transactions History
                </a>
              )}
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-between px-5">
          <Divider vertical className="mt-2" />
          {/* Non-admin */}
          {admin ? (
            <div className="my-5 "></div>
          ) : (
            <ul class="flex flex-col mt-4 mx-5 bg-gray-50 md:flex-row md:space-x-8  md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/orders"
                  className={`block py-3 pl-0 pr-4  ${
                    splitLocation[1] === "orders"
                      ? "text-white"
                      : "text-gray-700"
                  } rounded dark:text-gray-400 md:dark:hover:text-white`}
                >
                  Your Orders
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/addPlace"
                  className={`block py-3 pl-2 pr-4  ${
                    splitLocation[1] === "addPlace"
                      ? "text-white"
                      : "text-gray-700"
                  } rounded dark:text-gray-400 md:dark:hover:text-white`}
                >
                  Rent Your Place
                </a>
              </li>
            </ul>
          )}

          <Dropdown>
            <Dropdown.Toggle
              variant="dark"
              id="dropdown-basic"
              className="w-20 h-20"
            >
              <img className="rounded" src={avatar} alt="Default avatar" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/profile">Profile</Dropdown.Item>
              <Divider className="mt-3 mb-2"></Divider>
              <Dropdown.Item href="/">
                <p class=" text-danger">Logout</p>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  ) : (
    <div></div>
  );
};

export default NavigationBar;
