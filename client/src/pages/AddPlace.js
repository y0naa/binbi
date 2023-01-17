import { useState } from "react";
import PlaceDetails from "../components/Add-Place/PlaceDetails";
import ConfirmationDetails from "../components/Add-Place/ConfirmationDetails";

const AddPlace = () => {
  const [step, setStep] = useState(0);

  const StepDisplay = () => {
    if (step === 0) {
      return <PlaceDetails />;
    } else {
      return <ConfirmationDetails />;
    }
  };
  return (
    <div className="form">
      <div className="progressBar"></div>
      <div className="formContainer">
        {/* <div className="header">
          <h1>{formTitles[step]}</h1>
        </div> */}
        <div className="body">{StepDisplay()}</div>
        <div className="my-5 flex justify-center">
          <button
            className="bg-cyan-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-300 text-white py-2 px-4 rounded-l   "
            disabled={step == 0}
            onClick={() => {
              setStep((curStep) => curStep - 1);
            }}
          >
            Prev
          </button>
          <button
            className="bg-cyan-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-300 text-white py-2 px-4 rounded-r  "
            disabled={step == 1}
            onClick={() => {
              setStep((curStep) => curStep + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPlace;
