package com.pegadaian.karyawan.nilai.services;

import com.pegadaian.karyawan.nilai.dao.JadwalRepository;
import com.pegadaian.karyawan.nilai.model.Jadwal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JadwalServiceImplementation implements JadwalService {

    private JadwalRepository jadwalRepository;

    @Autowired
    public JadwalServiceImplementation(JadwalRepository jadwalRepository) {
        this.jadwalRepository = jadwalRepository;
    }

    @Override
    public Jadwal store(Jadwal jadwal) {
        return jadwalRepository.save(jadwal);
    }

    @Override
    public List<Jadwal> index() {
        return jadwalRepository.findAll();
    }

    @Override
    public Jadwal show(String kode) {
        return jadwalRepository.findById(kode).orElse(null);
    }

    @Override
    public String delete(Jadwal jadwal) {
        if (show(jadwal.getKode()) == null) return null;
        jadwalRepository.delete(jadwal);
        return "OK";
    }

    @Override
    public String deleteByKode(String kode) {
        if (show(kode) == null) return null;
        jadwalRepository.deleteById(kode);
        return "OK";
    }
}
