import React from "react";
import { FaCity } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { MdOutlineLocalPostOffice } from "react-icons/md";

const PlaceDetails = () => {
  const Question = (text, type) => {
    return (
      <div class="relative z-0 w-full mb-6 group ">
        <input
          class="border-t-0 border-l-0 border-r-0 block py-2.5 px-0 w-full text-sm text-black bg-transparent border-b-2 border-cyan-600 appearance-none dark:text-white dark:border-gray-600 dark:focus: focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          type={type}
          required
        />
        <label
          for="floating_email"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          {text}
        </label>
      </div>
    );
  };
  return (
    <div>
      <div className="flex flex-col justify-start items-start px-5">
        <h1 className="py-5 font-semibold font-serif">
          Let us know a bit about your place
        </h1>
        {Question("What's the name of your place?")}
        <div className="shadow-md  rounded-md w-full p-3 mb-10">
          <h3 className="my-3 text-cyan-600">Location Details</h3>
          <hr></hr>
          <div className="flex flex-row justify-items-stretch w-full ">
            <div className="flex items-center w-full">
              <FaCity />
              <div className="mr-3"></div>
              {Question("Enter your City", "text")}
            </div>
            <div className="px-10"></div>
            <div className="flex items-center w-full">
              <GrMapLocation />
              <div className="mr-3"></div>
              {Question("Enter your State/Province", "text")}
            </div>
            <div className="px-10"></div>
            <div className="flex items-center w-full">
              <MdOutlineLocalPostOffice />
              <div className="mr-3"></div>
              {Question("Enter your postal code", "number")}
            </div>
          </div>
          {Question("What's the street address?", "text")}
        </div>
        <div className="shadow-md rounded-md w-full p-3 ">
          <h3 className="my-3 text-cyan-600">Facilities</h3>
          <hr></hr>
          <div className="flex flex-row justify-items-stretch w-full mb-3">
            <div className="flex-col items-center w-full">
              <label class="block mb-2 ml-1 text-sm font-medium text-gray-900 ">
                Number of rooms?
              </label>
              <input
                type="number"
                id="base-input"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
            </div>
            <div className="px-10"></div>
            <div className="flex-col items-center w-full">
              <label class="block mb-2 ml-1 text-sm font-medium text-gray-900 ">
                Number of bathrooms/showers?
              </label>
              <input
                type="number"
                id="base-input"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
            </div>
          </div>
          <label class="relative inline-flex items-center mb-4 cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" />
            <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span class="ml-3 text-sm font-medium text-gray-800 ">
              Hot water available
            </span>
          </label>

          <label
       
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            Others
          </label>
          <textarea
            id="message"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Other facilities you might want to add..."
          ></textarea>
        </div>
        <div className="w-full rounded-md flex items-center justify-center justify-items-center my-5 shadow-md px-3 pt-4 shadow-red-300">
        <h3 className="my-3 mr-5 text-cyan-600">Pricing</h3>
          {Question("Rp.", "text")} 
          <label class="block mb-2 text-sm font-medium text-gray-900 w-1/5">
            / night(s)
          </label>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
