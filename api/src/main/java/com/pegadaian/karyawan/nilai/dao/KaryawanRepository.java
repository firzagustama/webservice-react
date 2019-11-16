package com.pegadaian.karyawan.nilai.dao;

import com.pegadaian.karyawan.nilai.model.Karyawan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KaryawanRepository extends JpaRepository<Karyawan, String> {
}
