import React, {Component} from "react";
import Context from "../../Context";
import {Modal} from "react-bootstrap";

class NilaiJadwal extends Component {
    state = {
        isFetching: true,
        jadwal: [],
        nilai: [],
        showModal : false,
        karyawan: [],
        kodeKaryawan : '',
        nilaiVal: '',
        isUpdateNilai: false,
    };

    handleShow = (e) => {
        let kode = e.target.getAttribute("kode") || "";
        let nilai = e.target.getAttribute("nilai") || "";
        if (kode) {
            this.setState({isUpdateNilai: true, nilaiVal: nilai, kodeKaryawan: kode});
        }
        fetch(this.context.apiKaryawan)
            .then(response => (response.json()))
            .then(data => (this.setState({showModal: true, karyawan: data})))
    };

    handleClose = () => {
        this.setState({showModal: false});
    };

    handleChange = (e) => {
        e.preventDefault();
        if (e.target.id == 'nilaiVal' && (e.target.value < 0 || e.target.value > 100)) {
            document.getElementById("nilaiVal").classList.add("is-invalid");
            document.getElementById("errorNilaiVal").classList.remove("d-none");
        } else if (e.target.id == 'nilaiVal') {
            document.getElementById("nilaiVal").classList.remove("is-invalid");
            document.getElementById("errorNilaiVal").classList.add("d-none");
        }

        this.setState({[e.target.id]: e.target.value});
    };

    handleSubmit = () => {
        if (this.state.nilaiVal < 0 || this.state.nilaiVal > 100) return;
        this.setState({isFetching: true});
        let insertId = {
            'kode_karyawan': this.state.kodeKaryawan,
            'kode_jadwal': this.state.jadwal.kode
        };
        fetch(this.context.apiNilai, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'id': insertId,
                'nilai': this.state.nilaiVal
            })})
            .then(response => (
                response.json()
            ))
            .then(data => {
                let karyawan = this.state.karyawan.find( function (obj) {
                    return obj.kode == data.id.kode_karyawan
                });
                let insertNilai = {
                    id: insertId,
                    karyawan: karyawan,
                    nilai: data.nilai
                };
                let showNilai = this.state.nilai;
                if (this.state.isUpdateNilai) {
                    let indexUpdate = this.state.nilai.findIndex(function (obj) { return obj.id.kode_karyawan == insertId.kode_karyawan && obj.id.kode_jadwal == insertId.kode_jadwal;});
                    showNilai[indexUpdate] = insertNilai;
                } else {
                    showNilai = this.state.nilai.concat(insertNilai);
                }
                this.setState({showModal: false, isFetching: false, nilai: showNilai, isUpdateNilai: false, kodeKaryawan: '', nilaiVal: ''})
            });
    };

    handleDelete = (e) => {
        let deleteId = {
            "kode_karyawan": e.target.getAttribute("kode"),
            "kode_jadwal": this.state.jadwal.kode
        };

        fetch(this.context.apiNilai, {
            method: "delete",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(deleteId)})
            .then(data => {
                this.setState({
                    nilai: this.state.nilai.filter(function (obj) {
                        return obj.id.kode_karyawan !== deleteId.kode_karyawan || obj.id.kode_jadwal !== deleteId.kode_jadwal
                    })
                })})
    };

    componentDidMount() {
        let id = this.props.match.params.id;
        // Get jadwal detail
        fetch(this.context.apiJadwal + "/" + id)
            .then(response => response.json())
            .then(data => this.setState({jadwal: data, nilai: data.nilai, isFetching: false}))
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
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.isUpdateNilai ? "Ubah" : "Tambah"} Nilai</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={"px-5"}>
                            <div className={"form-group"}>
                                <label htmlFor={"kodeJadwal"}>Jadwal</label>
                                <input id={"kodeJadwal"} name={"kodeJadwal"} type={"text"} value={this.state.jadwal.kode} disabled={true} className={"form-control"}/>
                            </div>
                            {this.state.showModal &&
                            <div className={"form-group"}>
                                <label htmlFor={"kodeKaryawan"}>Karyawan</label>
                                <select id={"kodeKaryawan"} name={"kodeKaryawan"} className={"form-control"} onChange={this.handleChange} value={this.state.kodeKaryawan} disabled={this.state.isUpdateNilai}>
                                    <option value={''} disabled>---</option>
                                    {this.state.karyawan.map(karyawan => (
                                        <option key={karyawan.kode} value={karyawan.kode}>{karyawan.kode} - {karyawan.nama}</option>
                                    ))}
                                </select>
                            </div>
                            }
                            <div className={"form-group"}>
                                <label htmlFor={"nilaiVal"}>Nilai</label>
                                <input id={"nilaiVal"} name={"nilaiVal"} type={"number"} className={"form-control"} onChange={this.handleChange} value={this.state.nilaiVal}/>
                                <small id={"errorNilaiVal"} className={"text-danger float-right d-none"}>Nilai adalah 0 - 100</small>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className={"btn btn-outline-warning"} onClick={this.handleSubmit}>Simpan</button>
                    </Modal.Footer>
                </Modal>
                <div className={"row mb-3 px-3 d-flex justify-content-between"}>
                    <a href={"/jadwal"}><button className={"btn btn-outline-warning float-left"}>{"<"}</button></a>
                    <button className={"btn btn-outline-dark float-right"} onClick={this.handleShow}>Tambah Nilai</button>
                </div>
                <div className={"row"}>
                    <div className={"col-3"}>
                        <div className={"card"}>
                            <div className={"card-header bg-dark text-light"}>Jadwal</div>
                            <div className={"card-body"}>
                                <h5 className={"card-title"}>{this.state.jadwal.materi}</h5>
                                <h6 className={"card-subtitle mb-2 text-muted"}>{this.state.jadwal.kode}</h6>
                                <div className={"d-flex justify-content-between"}>
                                    <small className={"text-muted mr-2"}>Tanggal</small>
                                    <small className={"text-sm"}>{this.state.jadwal.tanggal.split('T')[0]}</small>
                                </div>
                                <div className={"d-flex justify-content-between"}>
                                    <small className={"text-muted mr-2"}>Lokasi</small>
                                    <small className={"text-sm"}>{this.state.jadwal.lokasi}</small>
                                </div>
                                <div className={"d-flex justify-content-between"}>
                                    <small className={"text-muted mr-2"}>Session</small>
                                    <small className={"text-sm"}>{this.state.jadwal.session}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-9"}>
                        <table className={"table"}>
                            <thead className={"bg-dark text-light"}>
                            <tr>
                                <td>Kode</td>
                                <td>Nama</td>
                                <td>Alamat</td>
                                <td>Phone</td>
                                <td>Nilai</td>
                                <td width={165}>Aksi</td>
                            </tr>
                            </thead>
                            <tbody className={"border border-muted"}>
                            {this.state.nilai.map(nilai => (
                                <tr key={nilai.karyawan.kode}>
                                    <td>{nilai.karyawan.kode}</td>
                                    <td>{nilai.karyawan.nama}</td>
                                    <td>{nilai.karyawan.alamat}</td>
                                    <td>{nilai.karyawan.phone}</td>
                                    <td>{nilai.nilai}</td>
                                    <td className={"d-flex justify-content-between"}>
                                        <button className={"btn btn-outline-info"} kode={nilai.karyawan.kode} onClick={this.handleShow} nilai={nilai.nilai}>Ubah</button>
                                        <button className={"btn btn-outline-danger"} kode={nilai.karyawan.kode} onClick={this.handleDelete}>Hapus</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    }
}

NilaiJadwal.contextType = Context;
export default NilaiJadwal;