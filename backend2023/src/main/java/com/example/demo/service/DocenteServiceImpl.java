package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Curso;
import com.example.demo.entity.Docente;
//import com.example.demo.entity.Material;
import com.example.demo.repository.CursoRepository;
import com.example.demo.repository.DocenteRepository;

@Service
public class DocenteServiceImpl implements DocenteService {

	@Autowired
	DocenteRepository docenteRepository;

	@Override
	public List<Docente> findAllDocente() {
		return docenteRepository.findAll();
	}

	@Override
	public Optional<Docente> findDocenteById(Long id) {
		return docenteRepository.findById(id);
	}

}