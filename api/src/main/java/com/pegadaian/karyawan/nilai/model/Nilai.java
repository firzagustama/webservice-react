package com.pegadaian.karyawan.nilai.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "nilai")
public class Nilai implements Serializable {
    @EmbeddedId
    NilaiId id;

    @ManyToOne
    @MapsId("kode_karyawan")
    @JoinColumn(name = "kode_karyawan")
    @JsonIgnoreProperties("nilai")
    Karyawan karyawan;
    @ManyToOne
    @MapsId("kode_jadwal")
    @JoinColumn(name = "kode_jadwal")
    @JsonIgnoreProperties("nilai")
    Jadwal jadwal;
    Integer nilai;

    public Nilai() {
    }

    public NilaiId getId() {
        return id;
    }

    public void setId(NilaiId id) {
        this.id = id;
    }

    public Karyawan getKaryawan() {
        return karyawan;
    }

    public void setKaryawan(Karyawan karyawan) {
        this.karyawan = karyawan;
    }

    public Jadwal getJadwal() {
        return jadwal;
    }

    public void setJadwal(Jadwal jadwal) {
        this.jadwal = jadwal;
    }

    public Integer getNilai() {
        return nilai;
    }

    public void setNilai(Integer nilai) {
        this.nilai = nilai;
    }
}
