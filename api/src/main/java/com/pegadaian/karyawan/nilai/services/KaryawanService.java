package com.pegadaian.karyawan.nilai.services;

import com.pegadaian.karyawan.nilai.model.Karyawan;
import com.pegadaian.karyawan.nilai.model.Nilai;

import java.util.List;
import java.util.Set;

public interface KaryawanService {

    Karyawan store(Karyawan karyawan);

    List<Karyawan> index();

    Karyawan show(String kode);

    String delete(Karyawan karyawan);

    String deleteByKode(String kode);

}
