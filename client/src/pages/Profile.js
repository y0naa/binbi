import { useEffect, useState } from "react";

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

  return (
    <div>
      <div className="form-group m-5 me-5 ms-5 pe-5 ps-5">
        <h3 className="mb-3">PROFILE</h3>
        <label>ID User</label>
        <label type="text"  className="form-control mt-1">{data.id_user}</label>
        <div className="form-group mt-3">
          <label>Username</label>
          <label type="text" className="form-control mt-1">{data.username}</label>
        </div>
        <div className="form-group mt-3">
          <label>Nama Depan</label>
          <label type="text" className="form-control mt-1">{data.nama_depan}</label>
        </div>
        <div className="form-group mt-3">
          <label>Nama Belakang</label>
          <label type="text" className="form-control mt-1">{data.nama_belakang}</label>
        </div>
        <div className="form-group mt-3">
          <label>No Telp</label>
          <label type="text" className="form-control mt-1">{data.no_telp}</label>
        </div>
      </div>
    </div>
  );
};

export default Profile;
