import { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

const Transactions = () => {
  const accessToken = window.sessionStorage.getItem("accessToken");
  const refreshToken = window.sessionStorage.getItem("refreshToken");
  const userID = window.sessionStorage.getItem("userID");
  const [search, setSearch] = useState();
  const [data, setData] = useState([{}]);

  const columns = [
    {
      dataField: "id_transaksi",
      text: "ID Transaksi",
    },
    {
      dataField: "id_reservasi",
      text: "ID Reservasi",
    },
    {
      dataField: "total",
      text: "Total",
    },
    {
      dataField: "metode_bayar",
      text: "Metode Bayar",
    },
  ];

  const handleSearch = (event) => {
    event.preventDefault();
    if (search == null) {
      search = "";
    }
    fetch("http://localhost:3030/admin/transactions", {
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
    fetch("http://localhost:3030/user/transactions", {
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
      <NavigationBar />
  
      <div className="m-5">
      <h3>Transaksi Anda</h3>
        {
          //memastikan data ada isinya
          data && (
            <BootstrapTable
              keyField="id_transaksi"
              data={data}
              columns={columns}
            />
          )
        }
      </div>
    </div>
  );
};

export default Transactions;
