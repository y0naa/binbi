import React from "react";
import { Link } from "react-router-dom";

const ConfirmationDetails = () => {
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
    <div className="flex flex-col items-center">
      <h1 className="py-5 font-semibold font-serif">
        Is this your place information?
      </h1>
      <div className="flex w-max-1/2 flex-col items-start justify-center shadow-md rounded-lg p-5">
        <h1 className="font-serif italic text-cyan-600 ">Place name</h1>
        {Tag("Address: ", "postal code and stuff")}
        {Tag("Bedrooms: ", " 3 (rooms)")}
        {Tag("Bathrooms: ", " 1 (rooms)")}
        {Tag("Other Facilities: ", "pool")}
        <div className="w-full w-max-1/2 rounded-md flex justify-start items-center">
          <h3 className="my-3 mr-5 text-red-500 text-xl">Price: </h3>
          <label class="text-lg w-max-fit font-medium text-gray-900">
            Rp. {}
          </label>
        </div>
        <Link to="/" className="w-full mt-3">
          <button className="button-primary w-full px-20 py-3">Save Place</button>
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationDetails;
