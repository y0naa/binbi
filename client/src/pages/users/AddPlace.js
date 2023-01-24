import { useEffect, useState } from "react";
import PlaceDetails from "../../components/Add-Place/PlaceDetails";
import ConfirmationDetails from "../../components/Add-Place/ConfirmationDetails";

const AddPlace = () => {
  const userID = window.sessionStorage.getItem("userID");
  

  function generateID() {
    var num = Math.floor(Math.random() * 10000);
    return `T${num.toString()}`;
  }
  const [newData, changeData] = useState({
    id_tempat: generateID(),
    id_pemilik: { userID },
    nama_tempat: "",
    lokasi_tempat: "",
    harga_permalam: "",
    jumlah_kamar: "",
    jumlah_kamar_mandi: "",
    air_panas: "false",
    fasilitas_lain: "",
    url_gambar: ""
  });
  const [step, setStep] = useState(0);

  const StepDisplay = () => {
    if (step === 0) {
      return <PlaceDetails newData={newData} changeData={changeData} />;
    } else {
      return <ConfirmationDetails newData={newData} />;
    }
  };

  
  // useEffect(() => {
  //   alert(generateID());
  // }, [])

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
