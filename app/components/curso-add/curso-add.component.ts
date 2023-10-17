import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { Tema } from 'src/app/models/tema.model';
import { CursoService } from 'src/app/services/curso.service';
import { TemaService } from 'src/app/services/tema.service';
import { MaterialService } from 'src/app/services/material.service';
import { Material } from 'src/app/models/material.model';
import { DocenteService } from 'src/app/services/docente.service';
import { Docente } from 'src/app/models/docente.model';

@Component({
	selector: 'app-curso-add',
	templateUrl: './curso-add.component.html',
	styleUrls: ['./curso-add.component.css']
})
export class CursoAddComponent implements OnInit {


	curso: Curso;
	submitted = false;

	temas: Tema[] = [];
	docentes: Docente[] = [];

	currentDate: Date;
	materiales: any[] = [];
	nombreRequeridoError = false;
	temaRequeridoError = false;
	showModal = false;

	constructor(private cursoService: CursoService, private temaService: TemaService, private materialService: MaterialService,private docenteService: DocenteService, private cd: ChangeDetectorRef) {
		this.curso = {
			nombre: '',
			fechaInicio: new Date(),
			idDocente: 0, // Campo obligatorio
			tema: { id: 0 }
		};


		this.currentDate = new Date();
	}

	materialesPorTema: Material[] = [];


	onTemaChange(): boolean {
		const temaId = this.curso.tema.id;
		// Verifica si se ha seleccionado un tema válido
		if (temaId) {
			this.loadMaterialesPorTema(temaId);
			this.temaRequeridoError = false;
			return true
		} else {
			return false
		}
	}	
	
	validateTema(): boolean {
	  if (!this.onTemaChange()) {
	    this.temaRequeridoError = true;
	    return false;
	  }
	  this.temaRequeridoError = false;
	  return true;
	}
	
	validateNombre(): boolean {
	  if (!this.curso.nombre) {
	    this.nombreRequeridoError = true;
	    return false;
	  }
	  this.nombreRequeridoError = false;
	  return true;
	}		
	

	loadMaterialesPorTema(temaId: number): void {
		// Busca los materiales por el tema seleccionado
		this.materialService.findByTema(temaId).subscribe((data) => {
			this.materialesPorTema = data as Material[];
			
		});
	}

	validateFechaInicio(): boolean {
		const fechaInicioString = this.curso.fechaInicio as unknown as string;
		const fecha = new Date(fechaInicioString);
		const fechaSeleccionada = new Date(fecha.setDate(fecha.getDate() + 1));
		const fechaActual = new Date();

		return fechaSeleccionada > fechaActual;
	}

	ngOnInit(): void {
		this.temaService.getAll().subscribe(data => {
			this.temas = data; // Asignamos los temas recibidos desde el backend
		});

		this.materialService.getAll().subscribe(data => {
			this.materiales = data;
		});

		this.docenteService.getAll().subscribe(data => {
			this.docentes = data;
		});
	}

	saveCurso(): void {
		if (this.validateFechaInicio()) {
			
			if(this.validateNombre()) {
				
				if(this.validateTema()) {
			
						const data = {
							id: this.curso.id,
							nombre: this.curso.nombre,
							fechaInicio: this.curso.fechaInicio,
							idDocente: this.curso.idDocente,
							tema: this.curso.tema,
							materiales: this.materialesPorTema
						};
						this.cursoService.create(data)
							.subscribe({
								next: (res) => {
			
									console.log(res);
									this.showModal = true;
									this.cd.detectChanges()
								},
								error: (e) => {
									console.error(e);
								}
							});
					
					
				} else {
					console.log('Error: El campo "tema" es obligatorio.'); 
				}
					
			} else {
				console.log('Error: El campo "nombre" es obligatorio.');
    			this.nombreRequeridoError = true; 		
			}
			
			} else {			
				console.log('Error: La fecha de inicio debe ser mayor o igual a la fecha actual');
			}
		
		}
	

	newCurso(): void {
		this.submitted = false;
		this.curso = {
			nombre: '',
			fechaInicio: new Date(),
			idDocente: 1, // Campo obligatorio
			tema: { id: 0 } as Tema,
		};
		this.nombreRequeridoError = false;
	}


	  openSuccessModal(): void {
		  this.saveCurso();
	  }
	
	  closeSuccessModal(): void {
	    this.showModal = false;
	  }
	
	  addCurso(): void {
	    this.newCurso(); // Lógica para agregar otro curso
	    this.closeSuccessModal();
	  }

}

