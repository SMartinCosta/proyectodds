package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.CursoService;
import com.example.demo.service.DocenteService;
import com.example.demo.entity.Curso;
import com.example.demo.entity.Docente;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class DocenteController {
	@Autowired
	DocenteService docenteService;
	
	@RequestMapping(value = "/docentes", method = RequestMethod.GET, produces = "application/json")
	public List<Docente> getDocentes() {
		return docenteService.findAllDocente();
	}
	
	@RequestMapping(value = "/docentes/{id}", method = RequestMethod.GET, produces = "application/json")
	public Optional<Docente> getDocente(@PathVariable("id") Long id) {
		return docenteService.findDocenteById(id);
	}
}
