package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Alumno;
import com.example.demo.entity.Curso;
import com.example.demo.entity.Docente;

public interface DocenteRepository extends JpaRepository<Docente, Long> {

	void save(Optional<Docente> DocenteToUpdate);
	
	List<Docente> findByid(Long id);
}
