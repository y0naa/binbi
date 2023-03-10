import React from "react";
import { BiBed } from "react-icons/bi";
import { FaHotTub, FaShower } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/card.css";

const Card = ({ data }) => {
  return (
    <div className="card m-5 ">
      <img className=" object-top w-full h-4/6 object-cover" src={data.url_gambar} alt="test" />
      <div className=" p-2.5 flex-col gap-4">
        {/* badge */}
        <div className="flex gap-10 items-center justify-between">
          <span className="text-xl font-bold">{data.nama_tempat}</span>
        </div>
        <p className="text-slate-700 m-0">{data.lokasi_tempat}</p>
        <p className="text-gray-500 m-0">Rp. {parseFloat(data.harga_permalam).toLocaleString('en')}</p>
        <div className="flex items-center justify-start mt-2">
          <BiBed />
          <span className="title flex-end">{data.jumlah_kamar} Kamar</span>
        </div>
        <div className="flex items-center justify-start mt-2">
          <FaShower />
          <span className="title flex-end">
            {data.jumlah_kamar_mandi} Bathrooms
          </span>
        </div>
        <div className="flex items-center justify-start mt-2">
          <FaHotTub />
          <span className="title flex-end">{data.air_panas}</span>
        </div>
        <div>
          <Link to="/details" state={{ prop: data }}>
            <button className="button-primary mt-3">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
