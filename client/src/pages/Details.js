import React, { useState } from "react";
import login from "../assets/login.jpg";
import { BiBed } from "react-icons/bi";
import { FaShower, FaHotTub } from "react-icons/fa";
import Datepicker from "react-tailwindcss-datepicker";

const Details = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });
  return (
    <div>
      <div className="flex items-stretch justify-evenly">
        <div className="flex m-5 flex-col">
          <img
            className="object-fill rounded-xl max-h-96"
            src={login}
            alt="test"
          />
          
          <h1 className="m-3">Name of Place</h1>
          <div className="flex flex-wrap justify-between p-3 gap-4">
            <div className="flex flex-col flex-1">
              <h3 className="text-gray-500">Location</h3>
              <h3 className="text-slate-700 text-lg">
                Hosted by: <span className="text-cyan-400">Contoh</span>
              </h3>
              <hr className="w-full"></hr>
              <div>
                <div className="flex items-center justify-start mt-2">
                  <BiBed />
                  <span className="ml-2 flex-end">Bedrooms: </span>
                </div>
                <div className="flex items-center justify-start mt-2">
                  <FaShower />
                  <span className="ml-2 flex-end">Bathrooms: </span>
                </div>
                <div className="flex items-center justify-start mt-2">
                  <FaHotTub />
                  <span className="ml-2 flex-end">Hot Water: </span>
                </div>
              </div>
              <hr className="w-full"></hr>
              <h3>Other Facilities</h3>
              <p>contoh kolam</p>
            </div>

            <div className="flex-col">
              <h3 className="text-cyan-600 my-3">
                Rp. 10101010{" "}
                <span className="text-lg text-gray-600"> /night</span>
              </h3>
              <div className="flex-row border-2 shadow-md rounded-xl p-16">
                <p className="text-gray-600 mb-1">Check-in</p>
                <input className="rounded-xl mb-3" type="date"></input>
                <p className="text-gray-600 mb-1">Check-Out</p>
                <input className="rounded-xl mb-3" type="date"></input>

                <p>Payment Method</p>
                <select className="form-control">
                <option value="" disabled selected>Select Method</option>
                  <option value="Transfer">Transfer</option>
                  <option value="OVO">OVO</option>
                  <option value="ShopeePay">ShopeePay</option>
                </select>

                <p className="mt-5 text-red-600">Total Payment:</p>
                <button className="button-primary mt-3">Rent Now</button>
              </div>
            </div>
          </div>

          <div className="flex justify-between"></div>
        </div>
      </div>
    </div>
  );
};

export default Details;
