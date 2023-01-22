import React from "react";
import { Link } from "react-router-dom";

const ConfirmationDetails = ({ newData }) => {
  const accessToken = window.sessionStorage.getItem("accessToken");
  const refreshToken = window.sessionStorage.getItem("refreshToken");
  const userID = window.sessionStorage.getItem("userID");
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
  const Tag = (title, desc) => {
    return (
      <div className="w-full w-max-1/2 rounded-md flex justify-start items-center">
        <h3 className="my-3 mr-5 text-gray-500 text-xl">{title}</h3>
        <label class="text-lg w-max-fit font-medium text-gray-900">
          {desc}
        </label>
      </div>
    );
  };
  return (
    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
      <h1 className="py-5 font-semibold font-serif">
        Is this your place information?
      </h1>
      <div className="flex w-max-1/2 flex-col items-start justify-center shadow-md rounded-lg p-5">
        <h1 className="font-serif italic text-cyan-600 ">
          {newData.nama_tempat}
        </h1>
        {Tag("Address: ", newData.lokasi_tempat)}
        {Tag("Bedrooms: ", newData.jumlah_kamar)}
        {Tag("Bathrooms: ", newData.jumlah_kamar_mandi)}
        {Tag("Other Facilities: ", newData.fasilitas_lain)}
        {Tag("Hot Water: ", newData.air_panas)}
        <div className="w-full w-max-1/2 rounded-md flex justify-start items-center">
          <h3 className="my-3 mr-5 text-red-500 text-xl">Price/night: </h3>
          <label class="text-lg w-max-fit font-medium text-gray-900">
            Rp. {newData.harga_permalam}
          </label>
        </div>

        <button className="button-primary w-full px-20 py-3">Save Place</button>
      </div>
    </form>
  );
};

export default ConfirmationDetails;
