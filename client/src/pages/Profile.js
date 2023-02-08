/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import avatar from "../assets/avatar.jpg";

const Profile = () => {
  const accessToken = window.sessionStorage.getItem("accessToken");
  const refreshToken = window.sessionStorage.getItem("refreshToken");
  const [data, setData] = useState({
    id_user: "",
    username: "",
    password: "",
    nama_depan: "",
    nama_belakang: "",
    no_telp: "",
  });
  useEffect(() => {
    fetch("http://localhost:3030/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Token": accessToken,
        "Refresh-Token": refreshToken,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json.user.Value);
        //alert(JSON.stringify(data));
      });
  }, []);

  const Label = ({text, val}) => {
    return (
      <div>
        <div className="flex flex-wrap items-center justify-between">
          <p className="text-lg text-gray-500">{text}</p>
          <div className="mx-3"></div>
          <p>{val}</p>
        </div>
        <hr className="mt-0"></hr>
      </div>
    );
  };

  return (
    <div className="flex flex-col my-5 items-center justify-center">
      <div className="relative bg-black shadow rounded-lg w-full mx-auto ">
        <img
          class="rounded-top-20  w-32 h-32 top-1/2 left-1/2  -translate-x-1/2  absolute shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
          src={avatar}
          alt="User Avatar"
        ></img>
      </div>
      <div className=" bg-white flex flex-col border-2 mt-16 w-3/4 lg:w-1/2 rounded-lg shadow px-24 py-20">
        <h3 className="font-serif font-bold mt-3 mb-24 text-5xl text-center">
          @{data.username}
        </h3>
     
       <Label text={"Your User ID:"} val={data.id_user}/>
       <Label text={"First Name:"} val={data.nama_depan}/>
       <Label text={"Last Name:"} val={data.nama_belakang}/>
       <Label text={"Phone Number:"} val={data.no_telp}/>
      </div>

      <div className="flex flex-col "></div>
    </div>
    // <div>
    //   <div className="form-group m-5 me-5 ms-5 pe-5 ps-5">
    //     <h3 className="mb-3">PROFILE</h3>
    //     <label>ID User</label>
    //     <label type="text"  className="form-control mt-1">{data.id_user}</label>
    //     <div className="form-group mt-3">
    //       <label>Username</label>
    //       <label type="text" className="form-control mt-1">{data.username}</label>
    //     </div>
    //     <div className="form-group mt-3">
    //       <label>Nama Depan</label>
    //       <label type="text" className="form-control mt-1">{data.nama_depan}</label>
    //     </div>
    //     <div className="form-group mt-3">
    //       <label>Nama Belakang</label>
    //       <label type="text" className="form-control mt-1">{data.nama_belakang}</label>
    //     </div>
    //     <div className="form-group mt-3">
    //       <label>No Telp</label>
    //       <label type="text" className="form-control mt-1">{data.no_telp}</label>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Profile;
