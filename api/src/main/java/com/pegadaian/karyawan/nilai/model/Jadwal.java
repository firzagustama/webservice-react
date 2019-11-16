package com.pegadaian.karyawan.nilai.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "jadwal")
public class Jadwal {
    @Id
    String kode;
    String materi;
    Date tanggal;
    Integer lokasi;
    Integer session;

    @OneToMany(mappedBy = "jadwal")
    @JsonIgnoreProperties("jadwal")
    List<Nilai> nilai;

    public Jadwal() {
    }

    public String getKode() {
        return kode;
    }

    public void setKode(String kode) {
        this.kode = kode;
    }

    public String getMateri() {
        return materi;
    }

    public void setMateri(String materi) {
        this.materi = materi;
    }

    public Date getTanggal() {
        return tanggal;
    }

    public void setTanggal(Date tanggal) {
        this.tanggal = tanggal;
    }

    public Integer getLokasi() {
        return lokasi;
    }

    public void setLokasi(Integer lokasi) {
        this.lokasi = lokasi;
    }

    public Integer getSession() {
        return session;
    }

    public void setSession(Integer session) {
        this.session = session;
    }

    public List<Nilai> getNilai() {
        return nilai;
    }

    public void setNilai(List<Nilai> nilai) {
        this.nilai = nilai;
    }
}
