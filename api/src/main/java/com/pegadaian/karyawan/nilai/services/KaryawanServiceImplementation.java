package com.pegadaian.karyawan.nilai.services;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.pegadaian.karyawan.nilai.dao.KaryawanRepository;
import com.pegadaian.karyawan.nilai.model.Karyawan;
import com.pegadaian.karyawan.nilai.model.Nilai;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class KaryawanServiceImplementation implements KaryawanService {

    private KaryawanRepository karyawanRepository;

    @Autowired
    public KaryawanServiceImplementation(KaryawanRepository karyawanRepository) {
        this.karyawanRepository = karyawanRepository;
    }

    @Override
    public Karyawan store(Karyawan karyawan) {
        return karyawanRepository.save(karyawan);
    }

    @Override
    public List<Karyawan> index() {
        return karyawanRepository.findAll();
    }

    @Override
    public Karyawan show(String kode) {
        return karyawanRepository.findById(kode).orElse(null);
    }

    @Override
    public String delete(Karyawan karyawan) {
        if (show(karyawan.getKode()) == null) return null;

        karyawanRepository.delete(karyawan);
        return "OK";
    }

    @Override
    public String deleteByKode(String kode) {
        if (show(kode) == null) return null;

        karyawanRepository.deleteById(kode);
        return "OK";
    }

}
