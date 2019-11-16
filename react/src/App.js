import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TableKaryawan from "./components/karyawan/TableKaryawan";
import NilaiKaryawan from "./components/karyawan/NilaiKaryawan";
import TableJadwal from "./components/jadwal/TableJadwal";
import NilaiJadwal from "./components/jadwal/NilaiJadwal";
import FormKaryawan from "./components/karyawan/FormKaryawan";
import FormJadwal from "./components/jadwal/FormJadwal";

class App extends React.Component {
    render() {
        return (
            <div>
                <nav className={"navbar navbar-dark navbar-expand-xl bg-dark justify-content-between"}>
                    <a className={"navbar-brand text-light"}>Webservices by @firzagustama</a>
                    <ul className={"navbar-nav"}>
                        <li className={"nav-item"}>
                            <a className={"nav-link"} href={"/karyawan"}>Karyawan</a>
                        </li>
                        <li className={"nav-item"}>
                            <a className={"nav-link"} href={"/jadwal"}>Jadwal</a>
                        </li>
                    </ul>
                </nav>
                <div className={"container p-5"}>
                    <BrowserRouter>
                        <Route exact path={"/"} component={TableKaryawan}/>
                        <Route exact path={"/karyawan"} component={TableKaryawan}/>
                        <Route exact path={"/karyawan/:id"} component={NilaiKaryawan}/>
                        <Route exact path={"/karyawan/:id/update"} render={(props) => <FormKaryawan {...props} isFetching={true} isUpdate={true}/>}/>
                        <Route exact path={"/create/karyawan"} render={(props) => <FormKaryawan {...props} isFetching={false} isUpdate={false}/>}/>

                        <Route exact path={"/jadwal"} component={TableJadwal}/>
                        <Route exact path={"/jadwal/:id"} component={NilaiJadwal}/>
                        <Route exact path={"/jadwal/:id/update"} render={(props) => <FormJadwal {...props} isFetching={true} isUpdate={true}/>}/>
                        <Route exact path={"/create/jadwal"} render={(props) => <FormJadwal {...props} isFetching={false} isUpdate={false}/>}/>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default App;
