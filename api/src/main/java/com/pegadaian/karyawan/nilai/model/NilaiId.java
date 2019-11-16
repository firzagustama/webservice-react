package com.pegadaian.karyawan.nilai.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Id;
import java.io.Serializable;

@Embeddable
public class NilaiId implements Serializable {
    @Column(name = "kode_karyawan")
    @JsonProperty("kode_karyawan")
    String kodeKaryawan;
    @Column(name = "kode_jadwal")
    @JsonProperty("kode_jadwal")
    String kodeJadwal;

    public NilaiId() {
    }

    public NilaiId(String kodeKaryawan, String kodeJadwal) {
        this.kodeKaryawan = kodeKaryawan;
        this.kodeJadwal = kodeJadwal;
    }

    public String getKodeKaryawan() {
        return kodeKaryawan;
    }

    public void setKodeKaryawan(String kodeKaryawan) {
        this.kodeKaryawan = kodeKaryawan;
    }

    public String getKodeJadwal() {
        return kodeJadwal;
    }

    public void setKodeJadwal(String kodeJadwal) {
        this.kodeJadwal = kodeJadwal;
    }
}
