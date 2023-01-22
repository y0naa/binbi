import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import Button from "react-bootstrap/Button";
import { Alert, Form } from "react-bootstrap";
import History from "../components/History";
const Transactions = () => {
  const [tes, setTes] = useState(false);
  const accessToken = window.sessionStorage.getItem("accessToken");
  const refreshToken = window.sessionStorage.getItem("refreshToken");
  const userID = window.sessionStorage.getItem("userID");
  const [search, setSearch] = useState();
  const [data, setData] = useState([]);
  const [location, setLocation] = useState([]);
  const [tempPlaces, setTempPlaces] = useState([]);
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
    // Fetch Metode Bayar & total
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

    // Fetch Details Tempat
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
        const fetches = tempPlaces.map((d) => {
          return fetch(
            `http://localhost:3030/user/places?idTempat=${d.id_tempat}`,
            {
              method: "GET",
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Token": accessToken,
                "Refresh-Token": refreshToken,
              },
            }
          )
            .then((response) => response.json())
            .then((json) => {
              return {
                nama_tempat: json.data.nama_tempat,
                lokasi_tempat: json.data.lokasi_tempat,
              };
            });
        });

        Promise.all(fetches).then((responses) => {
          // alert(tempPlaces)
          setLocation(responses);
          setTes(true);
        });
      });
  }, [tes]);

  return (
    <div className="">
      <h1 className="font-serif font-bold mx-5 my-5">Your Transactions</h1>

      <div>

        {location.map((item, index) => (
          <div key={index}>
            <History loc={item} trans={data[index]} res={tempPlaces[index]} />;
          </div>
        ))}
      </div>

      {/* for admin  */}
      {/* <div className="m-5">
        {data && (
          <BootstrapTable
            keyField="id_transaksi"
            data={data}
            columns={columns}
          />
        )}
      </div> */}
    </div>
  );
};

export default Transactions;
