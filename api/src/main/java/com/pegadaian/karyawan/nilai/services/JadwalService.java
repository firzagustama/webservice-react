package com.pegadaian.karyawan.nilai.services;

import com.pegadaian.karyawan.nilai.model.Jadwal;

import java.util.List;

public interface JadwalService {

    Jadwal store(Jadwal jadwal);

    List<Jadwal> index();

    Jadwal show(String kode);

    String delete(Jadwal jadwal);

    String deleteByKode(String kode);

}
