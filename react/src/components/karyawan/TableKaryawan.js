import React, {Component} from 'react';
import Context from "../../Context";

class TableKaryawan extends Component {
    state = {
        isFetching: true,
        karyawan: [],
    };

    handleDelete = (e) => {
        this.setState({isFetching: true});

        let kode = e.target.getAttribute("kode");
        fetch(this.context.apiKaryawan + "/" + kode, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
        }).then(response => {
           response.json();
        }).then(data => {
            this.setState({
                isFetching: false,
                karyawan: this.state.karyawan.filter(function (obj) {
                    return obj.kode !== kode;
                })
            });
        });
    };

    componentDidMount() {
        fetch(this.context.apiKaryawan)
            .then(response => response.json())
            .then(data => this.setState({isFetching: false, karyawan: data}))
    }

    render() {
        return this.state.isFetching ?
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            :
            <div className={"container"}>
                <div className={"row mb-3 d-flex justify-content-between"}>
                    <h5 className={"card-title"}>Karyawan</h5>
                    <a href={"/create/karyawan"}><button className={"btn btn-outline-dark"}>Tambah Karyawan</button></a>
                </div>
                <div className={"row"}>
                    <table className={"table border border-muted"}>
                        <thead className={"bg-dark text-light"}>
                        <tr>
                            <td>Kode</td>
                            <td>Nama</td>
                            <td>Alamat</td>
                            <td>Phone</td>
                            <td width={"225px"}>Aksi</td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.karyawan.map(karyawan => (
                            <tr key={karyawan.kode}>
                                <td>{karyawan.kode}</td>
                                <td>{karyawan.nama}</td>
                                <td>{karyawan.alamat}</td>
                                <td>{karyawan.phone}</td>
                                <td className={"d-flex justify-content-between"}>
                                    <a href={"/karyawan/" + karyawan.kode + "/update"}><button className={"btn btn-outline-info"}>Ubah</button></a>
                                    <a href={"/karyawan/" + karyawan.kode}><button className={"btn btn-outline-warning"}>Nilai</button></a>
                                    <button className={"btn btn-outline-danger"} kode={karyawan.kode} onClick={this.handleDelete}>Hapus</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
    }
}

TableKaryawan.contextType = Context;
export default TableKaryawan;