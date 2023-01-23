import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";

const Orders = () => {
  const accessToken = window.sessionStorage.getItem("accessToken");
  const refreshToken = window.sessionStorage.getItem("refreshToken");
  const userID = window.sessionStorage.getItem("userID");
  const [search, setSearch] = useState();
  const [data, setData] = useState([{}]);

  const columns = [
    {
      dataField: "id_reservasi",
      text: "Reservation ID",
    },
    {
      dataField: "id_tempat",
      text: "Place ID",
    },
    {
      dataField: "id_pemilik",
      text: "Your ID",
    },
    {
      dataField: "tanggal_mulai",
      text: "Check-in Date",
    },
    {
      dataField: "tanggal_selesai",
      text: "Check-out Date",
    },
    {
      dataField: "id_penyewa",
      text: "Tenant ID",
    },
  ];

  const handleSearch = (event) => {
    event.preventDefault();
    if (search == null) {
      search = "";
    }
    fetch("http://localhost:3030/user/orders", {
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
    fetch("http://localhost:3030/user/orders", {
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
    
  
      <div className="m-5">
      <h1 className="font-serif mb-5 font-bold">Your Renting Orders</h1>
        {
          data.length < 1 ?
          <h3 className="text-center text-lg">Sorry, you don't have any orders yet</h3>
          //memastikan data ada isinya
          : data && (
            <BootstrapTable
              keyField="id_reservasi"
              data={data}
              columns={columns}
            />
          )
        }
      </div>
    </div>
  );
};

export default Orders;
