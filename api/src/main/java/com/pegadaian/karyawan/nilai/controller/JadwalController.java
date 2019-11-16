package com.pegadaian.karyawan.nilai.controller;

import com.pegadaian.karyawan.nilai.model.Jadwal;
import com.pegadaian.karyawan.nilai.model.Karyawan;
import com.pegadaian.karyawan.nilai.services.JadwalService;
import com.pegadaian.karyawan.nilai.services.KaryawanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/jadwal")
public class JadwalController {

    private JadwalService jadwalService;

    @Autowired
    public JadwalController(JadwalService jadwalService) {
        this.jadwalService = jadwalService;
    }

    @CrossOrigin("*")
    @PostMapping
    public Jadwal store(@RequestBody Jadwal jadwal) {
        return jadwalService.store(jadwal);
    }

    @CrossOrigin("*")
    @GetMapping
    public List<Jadwal> index() {
        return jadwalService.index();
    }

    @CrossOrigin("*")
    @GetMapping(path = "{kode}")
    public Jadwal show(@PathVariable("kode") String kode) {
        return jadwalService.show(kode);
    }

    @CrossOrigin("*")
    @DeleteMapping
    public String delete(@RequestBody Jadwal jadwal) {
        return jadwalService.delete(jadwal);
    }

    @CrossOrigin("*")
    @DeleteMapping(path = "{kode}")
    public String deleteByKode(@PathVariable("kode") String kode) {
        return jadwalService.deleteByKode(kode);
    }
}
