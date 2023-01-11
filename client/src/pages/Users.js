import { Form } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import { useEffect, useState } from "react";

const Users = () => {
  const accessToken = window.sessionStorage.getItem("accessToken");
  const refreshToken = window.sessionStorage.getItem("refreshToken");
  const userID = window.sessionStorage.getItem("userID");
  const [search, setSearch] = useState();
  const [data, setData] = useState([{}]);

  const columns = [
    {
      dataField: "id_user",
      text: "ID User",
    },
    {
      dataField: "username",
      text: "Username",
    },
    {
      dataField: "password",
      text: "Password",
    },
    {
      dataField: "nama_depan",
      text: "Nama Depan",
    },
    {
      dataField: "nama_belakang",
      text: "Nama Belakang",
    },

    
  ];

  const handleSearch = (event) => {
    event.preventDefault();
    if (search == null) {
      search = "";
    }
    fetch(`http://localhost:3030/admin/users/${search}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Token": accessToken,
        "Refresh-Token": refreshToken,
      },
    })
      .then((response) => response.json())
      .then((json) => setData(json.data));
  };


  useEffect(() => {
    fetch("http://localhost:3030/admin/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Token": accessToken,
        "Refresh-Token": refreshToken,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
      });
  }, []);

  return (
    <div>
      <div className="row ">
        <div className="col-9">
          <Form className="ms-5 ps-5 ">
            <Form.Control
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search by ID"
              className="ms-4"
            />
          </Form>
        </div>
        <div className="col">
          <button onClick={handleSearch} className="btn btn-primary ms-5">
            Search
          </button>
        </div>
      </div>

      <div className="m-5">
        {
          //memastikan data ada isinya
          data && (
            <BootstrapTable
              keyField="id_tempat"
              data={data}
              columns={columns}
            />
          )
        }
      </div>
    </div>
  );
};

export default Users;
