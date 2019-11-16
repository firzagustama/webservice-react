package com.pegadaian.karyawan.nilai.services;

import com.pegadaian.karyawan.nilai.model.Nilai;
import com.pegadaian.karyawan.nilai.model.NilaiId;

import java.util.List;

public interface NilaiService {

    Nilai store(Nilai nilai);

    List<Nilai> index();

    Nilai show(String kodeKaryawan, String kodeJadwal);

    String delete(Nilai nilai);

    String deleteByKode(NilaiId nilaiId);

}
