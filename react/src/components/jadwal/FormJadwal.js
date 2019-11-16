import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import Context from "../../Context";

class FormJadwal extends Component {
    state = {
        isFetching: this.props.isFetching,
        isUpdate: this.props.isUpdate,
        kode: '',
        materi: '',
        tanggal: '',
        lokasi: '',
        session: '',
    };

    handleChange = (e) => {
        e.preventDefault();
        this.setState({[e.target.id]: e.target.value})
    };

    handleSubmit = (e) => {
        e.preventDefault();
        fetch(this.context.apiJadwal, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "kode": this.state.kode,
                "materi": this.state.materi,
                "tanggal": this.state.tanggal,
                "lokasi": this.state.lokasi,
                "session": this.state.session
            })
        }).then(response => {
            response.json();
            this.props.history.push('/jadwal')
        });
    };

    componentDidMount() {
        let id = this.props.match.params.id;
        if (id) {
            fetch(this.context.apiJadwal + "/" + id)
                .then(response => response.json())
                .then(data => this.setState({
                    kode: data.kode,
                    materi: data.materi,
                    tanggal: data.tanggal,
                    lokasi: data.lokasi,
                    session: data.session,
                    isFetching: false
                }))
        }
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
                <div className={"card"} style={{width: 400, margin: "auto"}}>
                    <div className={"card-header bg-dark text-light d-flex justify-content-between"}>
                        <a href={"/karyawan"}><button className={"btn btn-dark"}>{"<"}</button></a>
                        <p>{this.state.isUpdate ? "Ubah Jadwal" : "Tambah Jadwal"}</p>
                    </div>
                    <div className={"card-body px-lg-5"}>
                        <div>
                            <div className={"form-group"}>
                                <label htmlFor={"kode"}>Kode Jadwal</label>
                                <input id={"kode"} type={"text"} className={"form-control"} required value={this.state.kode} disabled={this.state.isUpdate} onChange={this.handleChange}/>
                                <small id={"error_kode"} className={"text-danger float-right"}></small>
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor={"materi"}>Materi</label>
                                <input id={"materi"} type={"text"} className={"form-control"} required value={this.state.materi} onChange={this.handleChange}/>
                                <small id={"error_materi"} className={"text-danger float-right"}></small>
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor={"tanggal"}>Tanggal</label>
                                <input id={"tanggal"} type={"date"} className={"form-control"} required value={this.state.tanggal.split("T")[0]} onChange={this.handleChange}/>
                                <small id={"error_tanggal"} className={"text-danger float-right"}></small>
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor={"lokasi"}>Lokasi</label>
                                <input id={"lokasi"} type={"number"} className={"form-control"} required value={this.state.lokasi} onChange={this.handleChange}/>
                                <small id={"error_lokasi"} className={"text-danger float-right"}></small>
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor={"session"}>Sesi</label>
                                <input id={"session"} type={"number"} className={"form-control"} required value={this.state.session} onChange={this.handleChange}/>
                                <small id={"error_session"} className={"text-danger float-right"}></small>
                            </div>
                            <button className={"btn btn-outline-warning float-right"} onClick={this.handleSubmit}>{this.state.isUpdate ? "Ubah" : "Tambah"}</button>
                        </div>
                    </div>
                </div>
            </div>
    }
}

FormJadwal.contextType = Context;
export default FormJadwal;