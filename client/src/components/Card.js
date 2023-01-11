import React from "react";
import "../styles/card.css";
import login from "../assets/login.jpg";
import { BiBed } from "react-icons/bi";
import { FaShower, FaHotTub } from "react-icons/fa";

const Card = ({data}) => {
  return (
    <div className="card m-5">
      <img className="w-full h-full object-cover" src={login} alt="test" />
      <div className=" p-2.5 flex-col gap-4">
        {/* badge  */}
        <div className="flex gap-10 items-center justify-between">
          <span className="text-xl font-bold">{data.nama_tempat}</span>
          <span className="title flex-end">Rating</span>
        </div>
        <p className="text-slate-700 m-0">{data.lokasi_tempat}</p>
        <p className="text-gray-500 m-0">Rp. {data.harga_permalam}</p>
        <div className="flex items-center justify-start mt-2">
          <BiBed />
          <span className="title flex-end">{data.jumlah_kamar} Kamar</span>
        </div>
        <div className="flex items-center justify-start mt-2">
          <FaShower />
          <span className="title flex-end">{data.jumlah_kamar_mandi} Bathrooms</span>
        </div>
        <div className="flex items-center justify-start mt-2">
          <FaHotTub />
          <span className="title flex-end">{data.air_panas}</span>
        </div>
        <div>
          <button className="button-primary mt-3">Rent now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;