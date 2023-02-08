/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BiBed } from "react-icons/bi";
import { FaHotTub, FaShower } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Details = () => {
  // Session Storage
  const accessToken = window.sessionStorage.getItem("accessToken");
  const refreshToken = window.sessionStorage.getItem("refreshToken");
  const userID = window.sessionStorage.getItem("userID");
  const idReservasi = `${Math.floor(Math.random() * 10000)}`;

  

  // Use Location
  const location = useLocation();
  const { prop } = location.state;

  // use states
  const [total, setTotal] = useState(0);
  const [rev, setRev] = useState({
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


  function addTotal(mul, sel, harga) {
    //alert(harga)
    const msDay = 60 * 60 * 24 * 1000;
    const date1 = new Date(mul);
    const date2 = new Date(sel);
    const days = Math.floor((date2 - date1) / msDay);
    return days * harga;
  }

  const handleCheckout = (event) => {
    event.preventDefault();
    if (total < 1) {
      alert("Check-out date must be after check-in");
      return;
    }
    transaction.id_reservasi = `R${userID}${rev.id_reservasi}`;
    transaction.id_transaksi = `${userID}${Math.floor(Math.random() * 10000)}`;
    transaction.total = total;

    fetch("http://localhost:3030/user/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Token": accessToken,
        "Refresh-Token": refreshToken,
      },
      body: JSON.stringify(rev),
    }).then((response) => {
      if (response.ok) {
        //alert("transaction" + transaction.id_reservasi);
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
            alert("Something went wrong, make sure you selected a payment method");
          }
        });
      } else {
        alert(
          "Could not save the reservation, make sure you have a valid input"
        );
      }
    });
  };

  useEffect(() => {
    setRev((prevState) => {
      return {
        ...prevState,
        id_reservasi: idReservasi,
        id_tempat: prop.id_tempat,
        id_pemilik: prop.id_pemilik,
        id_penyewa: userID,
      };
    });
    setTotal(
      addTotal(rev.tanggal_mulai, rev.tanggal_selesai, prop.harga_permalam)
    );
  }, [rev.tanggal_mulai, rev.tanggal_selesai]);

  return (
    <form onSubmit={handleCheckout}>
      <div className="flex items-stretch justify-evenly">
        <div className="flex m-5 flex-col">
          <img
            className="object-contain rounded-xl max-h-96"
            src={prop.url_gambar}
            alt="test"
          />

          <h1 className="m-3">{prop.nama_tempat}</h1>
          <div className="flex flex-wrap justify-between p-3 gap-4">
            <div className="flex flex-col flex-1">
              <h3 className="text-gray-500">{prop.lokasi_tempat}</h3>
              <h3 className="text-slate-700 text-lg">
                Hosted by:{" "}
                <span className="text-cyan-400">{prop.id_pemilik}</span>
              </h3>
              <hr className="w-full"></hr>
              <div>
                <div className="flex items-center justify-start mt-2">
                  <BiBed />
                  <span className="ml-2 flex-end">
                    Bedrooms: {prop.jumlah_kamar}
                  </span>
                </div>
                <div className="flex items-center justify-start mt-2">
                  <FaShower />
                  <span className="ml-2 flex-end">
                    Bathrooms: {prop.jumlah_kamar_mandi}
                  </span>
                </div>
                <div className="flex items-center justify-start mt-2">
                  <FaHotTub />
                  <span className="ml-2 flex-end">
                    Hot Water: {prop.air_panas}
                  </span>
                </div>
              </div>
              <hr className="w-full"></hr>
              <h3>Other Facilities</h3>
              <p>{prop.fasilitas_lain}</p>
            </div>

            <div className="flex-col">
              <h3 className="text-cyan-600 my-3">
                Rp. {parseFloat(prop.harga_permalam).toLocaleString()}
                <span className="text-lg text-gray-600"> /night</span>
              </h3>
              <div className="flex-row border-2 shadow-md rounded-xl p-16">
                <p className="text-gray-600 mb-1">Check-in</p>
                <input
                  className="rounded-xl mb-3"
                  type="date"
                  onChange={(e) => {
                    setRev((state) => ({
                      ...state,
                      tanggal_mulai: e.target.value,
                    }));
                  }}
                ></input>
                <p className="text-gray-600 mb-1">Check-Out</p>
                <input
                  className="rounded-xl mb-3"
                  type="date"
                  onChange={(e) => {
                    setRev((state) => ({
                      ...state,
                      tanggal_selesai: e.target.value,
                    }));
                  }}
                ></input>

                <p>Payment Method</p>
                <select
                  className="form-control"
                  onChange={(e) => {
                    setTransaction((state) => ({
                      ...state,
                      metode_bayar: e.target.value,
                    }));
                  }}
                >
                  <option value="" disabled selected>
                    Select Method
                  </option>
                  <option value="Transfer">Transfer</option>
                  <option value="OVO">OVO</option>
                  <option value="ShopeePay">ShopeePay</option>
                </select>

                <p className="mt-5 text-red-600">Total Payment:</p>
                <p className=" text-black text-lg">
                  {" "}
                  Rp. {total.toLocaleString()}
                </p>
                <button
                  className="button-primary mt-3 bg-cyan-500"
                  type="submit"
                >
                  Rent Now
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between"></div>
        </div>
      </div>
    </form>
  );
};

export default Details;
