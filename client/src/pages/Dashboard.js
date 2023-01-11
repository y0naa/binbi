
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


const Dashboard = () => {
  const accessToken = window.sessionStorage.getItem("accessToken");
  const refreshToken = window.sessionStorage.getItem("refreshToken");
  const userID = window.sessionStorage.getItem("userID");

  // Use state
  // Order confirmation
  const [order, setOrder] = useState({
    id_reservasi: "tes",
    id_tempat: "",
    id_pemilik: "",
    tanggal_mulai: "",
    tanggal_selesai: "",
    id_penyewa: "",
  });

  const [transaction, setTransaction] = useState({
    id_transaksi: "",
    id_reservasi: "",
    total: 0,
    metode_bayar: "",
  });

  const [namaTempat, setNamaTempat] = useState();
  const [alamat, setAlamat] = useState();
  const [hargaPermalam, sethargaPermalam] = useState();
  const [metodeBayar, setMetodeBayar] = useState();

  // Show and add data to table
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [search, setSearch] = useState();
  const [data, setData] = useState();
  const [newData, changeData] = useState({
    id_tempat: "",
    id_pemilik: "",
    nama_tempat: "",
    lokasi_tempat: "",
    harga_permalam: "",
    jumlah_kamar: "",
    jumlah_kamar_mandi: "",
    air_panas: "false",
    fasilitas_lain: "",
  });

  const columns = [
    {
      dataField: "id_tempat",
      text: "ID Tempat",
      editable: userID === "01" ? true : false,
    },
    {
      dataField: "id_pemilik",
      text: "ID Pemilik",
      editable: userID === "01" ? true : false,
    },
    {
      dataField: "nama_tempat",
      text: "Nama Tempat",
      editable: userID === "01" ? true : false,
    },
    {
      dataField: "lokasi_tempat",
      text: "Alamat",
      editable: userID === "01" ? true : false,
    },
    {
      dataField: "harga_permalam",
      text: "Harga Per Malam",
      editable: userID === "01" ? true : false,
    },
    {
      dataField: "jumlah_kamar",
      text: "Jumlah Kamar",
      editable: userID === "01" ? true : false,
    },
    {
      dataField: "jumlah_kamar_mandi",
      text: "JML Kamar Mandi",
      editable: userID === "01" ? true : false,
    },
    {
      dataField: "air_panas",
      text: "Air Panas",
      editable: userID === "01" ? true : false,
    },
    {
      dataField: "fasilitas_lain",
      text: "Fasilitas Lain",
      editable: userID === "01" ? true : false,
    },
    userID === "01"
      ? {
          dataField: "remove",
          text: "Delete",
          editable: false,
          formatter: (_, row) => {
            return (
              <button
                className="btn btn-danger btn-xs"
                onClick={() => handleDelete(row.id_tempat)}
              >
                Delete
              </button>
            );
          },
        }
      : {
          dataField: "Sewa",
          text: "",
          editable: false,
          formatter: (_, row) => {
            return (
              <button
                className="btn btn-primary btn-xs"
                onClick={() => {
                  setOrder((state) => ({
                    ...state,
                    tanggal_mulai: "",
                    tanggal_selesai: "",
                  }));

                  handleSewa(row);
                }}
              >
                Sewa
              </button>
            );
          },
        },
  ];

  function notAdmin() {
    if (userID != "01") {
      return (
        <form onSubmit={handleSubmit}>
          <div className="form-group m-5 me-5 ms-5 pe-5 ps-5">
            <h3 className="mb-3">
              Tambahkan tempat Anda untuk menjadi penyewa
            </h3>
            <label>ID Tempat</label>
            <input
              type="number"
              className="form-control mt-1"
              value={newData.id_tempat}
              onChange={(e) => {
                changeData((state) => ({
                  ...state,
                  id_tempat: e.target.value,
                }));
              }}
            />
            <div className="form-group mt-3">
              <label>ID Penyewa</label>
              <input
                readOnly
                type="text"
                className="form-control mt-1"
                value={userID}
                onChange={(e) => {
                  changeData((state) => ({
                    ...state,
                    id_pemilik: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label>Nama Tempat</label>
              <input
                type="text"
                className="form-control mt-1"
                value={newData.nama_tempat}
                onChange={(e) => {
                  changeData((state) => ({
                    ...state,
                    nama_tempat: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label>Alamat</label>
              <input
                type="text"
                className="form-control mt-1"
                value={newData.lokasi_tempat}
                onChange={(e) => {
                  changeData((state) => ({
                    ...state,
                    lokasi_tempat: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label>Harga Per Malam</label>
              <input
                type="number"
                className="form-control mt-1"
                value={newData.harga_permalam}
                onChange={(e) => {
                  changeData((state) => ({
                    ...state,
                    harga_permalam: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label>Jumlah Kamar</label>
              <input
                type="number"
                className="form-control mt-1"
                value={newData.jumlah_kamar}
                onChange={(e) => {
                  changeData((state) => ({
                    ...state,
                    jumlah_kamar: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label>Jumlah Kamar Mandi</label>
              <input
                type="number"
                className="form-control mt-1"
                value={newData.jumlah_kamar_mandi}
                onChange={(e) => {
                  changeData((state) => ({
                    ...state,
                    jumlah_kamar_mandi: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label>Air Panas</label>
              <input
                type="checkbox"
                className=" ms-5 mt-1"
                value={newData.air_panas}
                onChange={(e) => {
                  changeData((state) => ({
                    ...state,
                    air_panas: e.target.checked.toString(),
                  }));
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label>Fasilitas Lain</label>
              <input
                type="text"
                className="form-control mt-1"
                value={newData.fasilitas_lain}
                onChange={(e) => {
                  changeData((state) => ({
                    ...state,
                    fasilitas_lain: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      );
    }
  }

  const handleCheckout = (event) => {
    //alert(order.id_tempat);
    event.preventDefault();
    let x = addTotal(order.tanggal_mulai, order.tanggal_selesai, hargaPermalam);
    transaction.total = x;
    transaction.metode_bayar = metodeBayar;
    handleClose();
    fetch("http://localhost:3030/user/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Token": accessToken,
        "Refresh-Token": refreshToken,
      },
      body: JSON.stringify(order),
    }).then((_) => {
      fetch("http://localhost:3030/user/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Token": accessToken,
          "Refresh-Token": refreshToken,
        },
        body: JSON.stringify(transaction),
      }).then((response) => {
        if (response.ok) {
          alert("Saved Successfully");
          window.location.reload();
        } else {
          alert("Something went wrong");
        }
      });
    });
  };

  function addTotal(mul, sel, harga) {
    //alert(harga)
    const msDay = 60 * 60 * 24 * 1000;
    const date1 = new Date(mul);
    const date2 = new Date(sel);
    const days = Math.floor((date2 - date1) / msDay);
    return days * harga;
  }
  const handleSewa = (row) => {
    const min = 1;
    const max = 100;
    const rand = min + Math.random() * (max - min);

    // alert(row.id_tempat);
    // Order Data
    let idRev = `${Math.ceil(rand)}`;
    setOrder((state) => ({
      ...state,
      id_reservasi: idRev,
      id_tempat: row.id_tempat,
      id_pemilik: row.id_pemilik,
      id_penyewa: userID,
    }));

    // Transaction Data
    setTransaction((state) => ({
      ...state,
      id_transaksi: `${userID}${Math.ceil(min + Math.random() * (max - min))}`,
      id_reservasi: `R${userID}${idRev}`,
    }));

    setNamaTempat(row.nama_tempat);
    setAlamat(row.lokasi_tempat);
    let x = parseInt(row.harga_permalam, 10);
    sethargaPermalam(x);
    setShow(true);
    return <p></p>;
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();
    newData.id_pemilik = userID;

    fetch("http://localhost:3030/user/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Token": accessToken,
        "Refresh-Token": refreshToken,
      },
      body: JSON.stringify(newData),
    }).then((response) => {
      if (response.ok) {
        alert("Data saved successfully");
        window.location.reload();
      } else {
        alert("Something went wrong");
      }
    });
  };

  const handleDelete = (rowId) => {
    fetch(`http://localhost:3030/admin/places/${rowId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Token": accessToken,
        "Refresh-Token": refreshToken,
      },
      body: JSON.stringify(newData),
    }).then((response) => {
      if (response.ok) {
        alert("Deleted successfully");
        window.location.reload();
      } else {
        alert("Place has been booked unable to delete");
      }
    });
  };

  const cellEdit = cellEditFactory({
    mode: "click",
    afterSaveCell: (oldValue, newValue, row, column) => {
      fetch(`http://localhost:3030/admin/places/${row.id_tempat}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Token": accessToken,
          "Refresh-Token": refreshToken,
        },
        body: JSON.stringify({
          id_tempat: row.id_tempat,
          id_pemilik: row.id_pemilik,
          nama_tempat: row.nama_tempat,
          lokasi_tempat: row.lokasi_tempat,
          harga_permalam: row.harga_permalam,
          jumlah_kamar: row.jumlah_kamar,
          jumlah_kamar_mandi: row.jumlah_kamar_mandi,
          air_panas: row.air_panas,
          fasilitas_lain: row.fasilitas_lain,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            alert("Something went wrong");
          }
        })
        .then((json) => alert("Update Successful"));
    },
  });

  useEffect(() => {
    fetch("http://localhost:3030/user/places", {
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
  }, [order]);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Confimation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>ID Penyewa</label>
          <label type="text" className="form-control mt-1 bg-light">
            {userID}
          </label>
          <div className="form-group mt-3">
            <label>Nama Tempat</label>
            <label type="text" className="form-control mt-1 bg-light">
              {namaTempat}
            </label>
          </div>
          <div className="form-group mt-3">
            <label>Alamat</label>
            <label type="text" className="form-control mt-1 bg-light">
              {alamat}
            </label>
          </div>
          <div className="form-group mt-3">
            <label>Tanggal Mulai</label>
            <input
              type="date"
              className="form-control mt-1"
              onChange={(e) => {
                setOrder((state) => ({
                  ...state,
                  tanggal_mulai: e.target.value,
                }));
              }}
            ></input>
          </div>
          <div className="form-group mt-3">
            <label>Tanggal Selesai</label>
            <input
              type="date"
              className="form-control mt-1"
              onChange={(e) => {
                setOrder((state) => ({
                  ...state,
                  tanggal_selesai: e.target.value,
                }));
              }}
            ></input>
          </div>
          <div className="form-group mt-3">
            <label>Metode Pembayaran</label>
            <select
              type="date"
              className="form-control mt-1"
              value={metodeBayar}
              onChange={(e) => {
                setMetodeBayar(e.target.value);
              }}
            >
              <option>silahkan pilih dibawah</option>
              <option value="Transfer">Transfer</option>
              <option value="OVO">OVO</option>
              <option value="ShopeePay">ShopeePay</option>
            </select>
          </div>

          <div className="form-group mt-3">
            <label className="text-danger">TOTAL</label>
            <label
              type="text"
              className="form-control text-white mt-1 bg-danger"
            >
              {addTotal(
                order.tanggal_mulai,
                order.tanggal_selesai,
                hargaPermalam
              )}
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCheckout}>
            Check Out
          </Button>
        </Modal.Footer>
      </Modal>
  
      

      <div className="m-5">
        {
          //memastikan data ada isinya
          data && (
            <BootstrapTable
              keyField="id_tempat"
              cellEdit={cellEdit}
              data={data}
              columns={columns}
            />
          )
        }
      </div>
      {notAdmin()}
    </div>
  );
};

export default Dashboard;
