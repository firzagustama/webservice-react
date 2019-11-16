package com.pegadaian.karyawan.nilai.dao;

import com.pegadaian.karyawan.nilai.model.Nilai;
import com.pegadaian.karyawan.nilai.model.NilaiId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NilaiRepository extends JpaRepository<Nilai, NilaiId> {
}
