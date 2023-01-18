import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import Button from "react-bootstrap/Button";
import { Alert, Form } from "react-bootstrap";
import History from "../components/History";
const Transactions = () => {
  const accessToken = window.sessionStorage.getItem("accessToken");
  const refreshToken = window.sessionStorage.getItem("refreshToken");
  const userID = window.sessionStorage.getItem("userID");
  const [search, setSearch] = useState();
  const [data, setData] = useState([{}]);
  const [location, setLocation] = useState([{}]);
  const [tempPlaces, setTempPlaces] = useState([{nama_tempat: "", lokasi_tempat: ""}]);
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
    var places = {};
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

    fetch("http://localhost:3030/user/reservations", {
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
        setTempPlaces(json.data);
      });
   
    tempPlaces.map((d) => {
      fetch(`http://localhost:3030/user/places?idTempat=${d.id_tempat}`, {
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
          //alert(json.data);
          setTempPlaces(
            // d.nama_tempat = json.data.nama_tempat
            // d.lokasi_tempat = json.data.lokasi_tempat
          );
        });
    });
  }, []);

  return (
    <div className="">
      <h1 className="font-serif font-bold mx-5 my-5">Your Transactions</h1>
      {tempPlaces.map((p) => {
        //alert(l.nama_tempat);
        return <History loc={p} />;
      })}

      {/* for admin  */}
      <div className="m-5">
        {data && (
          <BootstrapTable
            keyField="id_transaksi"
            data={data}
            columns={columns}
          />
        )}
      </div>
    </div>
  );
};

export default Transactions;
