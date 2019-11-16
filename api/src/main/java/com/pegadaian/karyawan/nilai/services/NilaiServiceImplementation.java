package com.pegadaian.karyawan.nilai.services;

import com.pegadaian.karyawan.nilai.dao.NilaiRepository;
import com.pegadaian.karyawan.nilai.model.Karyawan;
import com.pegadaian.karyawan.nilai.model.Nilai;
import com.pegadaian.karyawan.nilai.model.NilaiId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NilaiServiceImplementation implements NilaiService {

    NilaiRepository nilaiRepository;

    @Autowired
    public NilaiServiceImplementation(NilaiRepository nilaiRepository) {
        this.nilaiRepository = nilaiRepository;
    }

    @Override
    public Nilai store(Nilai nilai) {
        return nilaiRepository.save(nilai);
    }

    @Override
    public List<Nilai> index() {
        return nilaiRepository.findAll();
    }

    @Override
    public Nilai show(String kodeKaryawan, String kodeJadwal) {
        NilaiId id = new NilaiId();
        id.setKodeKaryawan(kodeKaryawan);
        id.setKodeJadwal(kodeJadwal);

        Nilai nilai = new Nilai();
        nilai.setId(id);
        return nilaiRepository.findOne(Example.of(nilai)).orElse(null);
    }

    @Override
    public String delete(Nilai nilai) {
        nilaiRepository.delete(nilai);
        return "OK";
    }

    @Override
    public String deleteByKode(NilaiId nilaiId) {
        nilaiRepository.deleteById(nilaiId);
        return "OK";
    }
}
