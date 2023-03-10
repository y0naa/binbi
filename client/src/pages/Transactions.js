/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import History from "../components/History";
const Transactions = () => {
  const [tes, setTes] = useState(false);
  const accessToken = window.sessionStorage.getItem("accessToken");
  const refreshToken = window.sessionStorage.getItem("refreshToken");
  const [data, setData] = useState([]);
  const [location, setLocation] = useState([]);
  const [tempPlaces, setTempPlaces] = useState([]);

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

        {
        location.length < 1 ? 
  <h3 className="text-center text-lg">Sorry you don't have any transactions yet</h3>       
        : location.map((item, index) => (
          <div key={index}>
            <History loc={item} trans={data[index]} res={tempPlaces[index]} />;
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
