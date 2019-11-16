package com.pegadaian.karyawan.nilai.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pegadaian.karyawan.nilai.model.Jadwal;
import com.pegadaian.karyawan.nilai.model.Nilai;
import com.pegadaian.karyawan.nilai.model.NilaiId;
import com.pegadaian.karyawan.nilai.services.JadwalService;
import com.pegadaian.karyawan.nilai.services.NilaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nilai")
public class NilaiController {

    NilaiService nilaiService;
    JadwalService jadwalService;

    @Autowired
    public NilaiController(NilaiService nilaiService, JadwalService jadwalService) {
        this.nilaiService = nilaiService;
        this.jadwalService = jadwalService;
    }

    @CrossOrigin("*")
    @PostMapping
    public Nilai store(@RequestBody Nilai nilai) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        System.out.println(mapper.writeValueAsString(nilai));
        return nilaiService.store(nilai);
    }
    @CrossOrigin("*")
    @GetMapping
    public List<Nilai> index() {
        return nilaiService.index();
    }

    @CrossOrigin("*")
    @DeleteMapping
    public String deleteByKode(@RequestBody NilaiId nilaiId) {
        return nilaiService.deleteByKode(nilaiId);
    }

}
