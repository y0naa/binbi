import React, { useEffect } from "react";
import { useState } from "react";
import BlockUi from "react-block-ui";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const ConfirmationDetails = ({ newData }) => {
  const accessToken = window.sessionStorage.getItem("accessToken");
  const refreshToken = window.sessionStorage.getItem("refreshToken");
  const userID = window.sessionStorage.getItem("userID");
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    setLoading(true);
    newData.id_pemilik = userID;
    await uploadImage();
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "vkixbvzp");
    formData.append("cloud_name", "binbi");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/binbi/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const json = await response.json();
    const { secure_url } = json;
    newData.url_gambar = secure_url;
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
  useEffect(() => {
    document.body.style.overflow='hidden'
  

  }, [])
  

  return (
    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
      {loading ? (
        <div className="flex sweet-loading h-screen w-screen justify-center items-center">
          
          

          <ClipLoader

          />
        </div>
      ) : (
        <div>
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
            <div class="mb-3 w-96">
              <input
                class="form-control block w-full px-3 py-1.5text-base font-normal text-gray-700  bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="file"
                id="formFile"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
              <label
                for="formFile"
                class="form-label inline-block mb-2 text-gray-700"
              >
                .png, .jpg, .jpeg
              </label>
            </div>

            <button className="button-primary w-full px-20 py-3">
              Save Place
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default ConfirmationDetails;
