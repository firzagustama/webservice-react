import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import Context from "../../Context";

class FormKaryawan extends Component {
    state = {
        isFetching: this.props.isFetching,
        isUpdate: this.props.isUpdate,
        kode: '',
        nama: '',
        alamat: '',
        phone: '',
    };

    handleChange = (e) => {
        e.preventDefault();
        this.setState({[e.target.id]: e.target.value})
    };

    handleSubmit = (e) => {
        e.preventDefault();
        fetch(this.context.apiKaryawan, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "kode": this.state.kode,
                "nama": this.state.nama,
                "alamat": this.state.alamat,
                "phone": this.state.phone
            })
        }).then(response => {
            response.json();
            this.props.history.push('/karyawan')
        });
    };

    componentDidMount() {
        let id = this.props.match.params.id;
        if (id) {
            fetch(this.context.apiKaryawan + "/" + id)
                .then(response => response.json())
                .then(data => this.setState({
                    kode: data.kode,
                    nama: data.nama,
                    alamat: data.alamat,
                    phone: data.phone,
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
                        <p>{this.state.isUpdate ? "Ubah Data Karyawan" : "Tambah Data Karyawan"}</p>
                    </div>
                    <div className={"card-body px-lg-5"}>
                        <div>
                            <div className={"form-group"}>
                                <label htmlFor={"kode"}>Kode Karyawan</label>
                                <input id={"kode"} type={"text"} className={"form-control"} required value={this.state.kode} disabled={this.state.isUpdate} onChange={this.handleChange}/>
                                <small id={"error_kode"} className={"text-danger float-right"}></small>
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor={"nama"}>Nama</label>
                                <input id={"nama"} type={"text"} className={"form-control"} required value={this.state.nama} onChange={this.handleChange}/>
                                <small id={"error_nama"} className={"text-danger float-right"}></small>
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor={"alamat"}>Alamat</label>
                                <textarea id={"alamat"} className={"form-control"} required  value={this.state.alamat} onChange={this.handleChange}/>
                                <small id={"error_alamat"} className={"text-danger float-right"}></small>
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor={"phone"}>Nomor HP</label>
                                <input id={"phone"} type={"number"} className={"form-control"} required value={this.state.phone} onChange={this.handleChange}/>
                                <small id={"error_phone"} className={"text-danger float-right"}></small>
                            </div>
                            <button className={"btn btn-outline-warning float-right"} onClick={this.handleSubmit}>{this.state.isUpdate ? "Ubah" : "Tambah"}</button>
                        </div>
                    </div>
                </div>
            </div>
    }
}

FormKaryawan.contextType = Context;
export default FormKaryawan;