package com.pegadaian.karyawan.nilai.model;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "karyawan")
public class Karyawan {
    @Id
    String kode;
    String nama;
    String alamat;
    String phone;

    @OneToMany(mappedBy = "karyawan")
    @JsonIgnoreProperties("karyawan")
    private List<Nilai> nilai;

    public Karyawan() {
    }

    public String getKode() {
        return kode;
    }

    public void setKode(String kode) {
        this.kode = kode;
    }

    public String getNama() {
        return nama;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getAlamat() {
        return alamat;
    }

    public void setAlamat(String alamat) {
        this.alamat = alamat;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<Nilai> getNilai() {
        return nilai;
    }

    public void setNilai(List<Nilai> nilai) {
        this.nilai = nilai;
    }


}
