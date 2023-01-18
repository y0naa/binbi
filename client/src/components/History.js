import React from "react";
import { MdLocationOn } from "react-icons/md";

const History = ({loc}) => {
  return (
    <div className="flex bg-white shadow-sm rounded-md py-3 px-3 m-5 justify-start">
      <div className="flex-1">
        <h3 className="my-3 text-cyan-600">{loc.nama_tempat}</h3>
        <div className="flex justify-items-center">
          <MdLocationOn className="mt-1 mr-2" />
          <p className="text-lg text-gray-500">{loc.lokasi_tempat}</p>
        </div>
      </div>
      <div className="flex flex-col border-l-2 pl-3 flex-1">
        <p className="text-lg text-gray-500">
          Payment Method: <span className="text-black"> </span>
        </p>
        <p className="text-lg text-red-600">
          Total: <span className="text-black"> Rp.</span>
        </p>
      </div>
    </div>
  );
};

export default History;
