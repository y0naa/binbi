import { useState, useEffect, useMemo } from "react";
import Card from "../components/Card";
import {dummy} from "../constants/dummy";

const Browse = () => {
  const accessToken = window.sessionStorage.getItem("accessToken");
  const refreshToken = window.sessionStorage.getItem("refreshToken");
  const userID = window.sessionStorage.getItem("userID");
  const [data, setData] = useState({
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
  const [search, setSearch] = useState();
  const [order, setOrder] = useState({
    id_reservasi: "tes",
    id_tempat: "",
    id_pemilik: "",
    tanggal_mulai: "",
    tanggal_selesai: "",
    id_penyewa: "",
  });



  // Methods
  const handleSearch = (event) => {
    event.preventDefault();

    if (search === null) {
      search = "tes";
    }
    fetch(`http://localhost:3030/user/places?nama=${search}&lokasi=${search}`, {
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
      .then((json) => {
        setData(json.data);
        alert("success");
        alert(data.nama_tempat);
        // alert(data[0].nama_tempat);
      });
  }, [order]);

  return (
    <div>
      <div className="row m-3">
        <form class="flex items-center m-1">
          <div class="relative w-full rounded-">
            <div class="absolute inset-y-0 left-2 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              class="bg-white border m-2 py-3 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
              placeholder="Search Places"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              required
            />
          </div>
          <button
            onClick={handleSearch}
            class="inline-flex items-center py-3 px-3 ml-4 text-sm font-medium text-white bg-sky-500 rounded  hover:bg-blue-800 focus:ring-4  "
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 mr-2 -ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            Search
          </button>
        </form>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center ">
        {/* {data[0].nama_tempat} */}
        <p></p>
        {
          dummy.map((d) => {
            return (
              <Card data={d}/>
            )
          })
        }
       
      </div>
    </div>
  );
};

export default Browse;
