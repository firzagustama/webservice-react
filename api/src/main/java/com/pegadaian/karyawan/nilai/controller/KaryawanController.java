package com.pegadaian.karyawan.nilai.controller;

import com.pegadaian.karyawan.nilai.model.Karyawan;
import com.pegadaian.karyawan.nilai.model.Nilai;
import com.pegadaian.karyawan.nilai.services.KaryawanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/api/karyawan")
public class KaryawanController {

    private KaryawanService karyawanService;

    @Autowired
    public KaryawanController(KaryawanService karyawanService) {
        this.karyawanService = karyawanService;
    }

    @CrossOrigin("*")
    @PostMapping
    public Karyawan store(@RequestBody Karyawan karyawan) {
        return karyawanService.store(karyawan);
    }

    @CrossOrigin("*")
    @GetMapping
    public List<Karyawan> index() {
        return karyawanService.index();
    }

    @CrossOrigin("*")
    @GetMapping(path = "{kode}")
    public Karyawan show(@PathVariable("kode") String kode) {
        return karyawanService.show(kode);
    }

    @CrossOrigin("*")
    @DeleteMapping
    public String delete(@RequestBody Karyawan karyawan) {
        return karyawanService.delete(karyawan);
    }

    @CrossOrigin("*")
    @DeleteMapping(path = "{kode}")
    public String deleteByKode(@PathVariable("kode") String kode) {
        return karyawanService.deleteByKode(kode);
    }

}
