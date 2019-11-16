import React from "react";

const ApiUrl = "http://127.0.0.1:8080/api";
const Context = React.createContext({
    apiKaryawan: ApiUrl + "/karyawan",
    apiJadwal: ApiUrl + "/jadwal",
    apiNilai: ApiUrl + "/nilai",
});

export default Context;