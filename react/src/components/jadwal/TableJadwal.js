import React, {Component} from 'react';
import Context from "../../Context";

class TableJadwal extends Component {
    state = {
        isFetching: true,
        jadwal: [],
    };

    handleDelete = (e) => {
        this.setState({isFetching: true});

        let kode = e.target.getAttribute("kode");
        fetch(this.context.apiJadwal + "/" + kode, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
        }).then(response => {
            response.json();
        }).then(data => {
            this.setState({
                isFetching: false,
                jadwal: this.state.jadwal.filter(function (obj) {
                    return obj.kode !== kode;
                })
            });
        });
    };

    componentDidMount() {
        fetch(this.context.apiJadwal)
            .then(response => response.json())
            .then(data => this.setState({isFetching: false, jadwal: data}))
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
                    <h5 className={"card-title"}>Jadwal</h5>
                    <a href={"/create/jadwal"}><button className={"btn btn-outline-dark"}>Tambah Jadwal</button></a>
                </div>
                <div className={"row"}>
                    <table className={"table border border-muted"}>
                        <thead className={"bg-dark text-light"}>
                        <tr>
                            <td>Kode</td>
                            <td>Materi</td>
                            <td>Tanggal</td>
                            <td>Lokasi</td>
                            <td>Session</td>
                            <td width={"225px"}>Aksi</td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.jadwal.map(jadwal => (
                            <tr key={jadwal.kode}>
                                <td>{jadwal.kode}</td>
                                <td>{jadwal.materi}</td>
                                <td>{jadwal.tanggal.split('T')[0]}</td>
                                <td>{jadwal.lokasi}</td>
                                <td>{jadwal.session}</td>
                                <td className={"d-flex justify-content-between"}>
                                    <a href={"/jadwal/" + jadwal.kode + "/update"}><button className={"btn btn-outline-info"}>Ubah</button></a>
                                    <a href={"/jadwal/" + jadwal.kode}><button className={"btn btn-outline-warning"}>Nilai</button></a>
                                    <button className={"btn btn-outline-danger"} onClick={this.handleDelete} kode={jadwal.kode}>Hapus</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
    }
}

TableJadwal.contextType = Context;
export default TableJadwal;