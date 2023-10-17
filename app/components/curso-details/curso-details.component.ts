import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/curso.model';
import { Tema } from 'src/app/models/tema.model';
import { Material } from 'src/app/models/material.model';
import { MaterialService } from 'src/app/services/material.service';
import { TemaService } from 'src/app/services/tema.service';

@Component({
	selector: 'app-curso-details',
	templateUrl: './curso-details.component.html',
	styleUrls: ['./curso-details.component.css']
})
export class CursoDetailsComponent implements OnInit {
	@Input() viewMode = false;
	@Input() currentElement: Curso = <Curso><unknown>{
		title: '',
		status: 'draft',
		content: ''
	};

	materiales: Material[] = [];
	showModal = false;

	message = '';
	constructor(
		private cursoService: CursoService,
		private route: ActivatedRoute,
		private router: Router,
		private materialService: MaterialService,
		private temaService: TemaService) { }
	ngOnInit(): void {
		if (!this.viewMode) {
			this.message = '';
			this.getElement(this.route.snapshot.params["id"]);
		}
	}
	getElement(id: string): void {
		this.cursoService.get(id)
			.subscribe({
				next: (data) => {
					this.currentElement = data;
					console.log(data);

					if (this.currentElement && this.currentElement.materiales) {
						this.materiales = this.currentElement.materiales;
					}
				},
				error: (e) => console.error(e)
			});
	}

	updateElement(): void {
		this.message = '';
		this.cursoService.update(this.currentElement.id, this.currentElement)
			.subscribe({
				next: (res) => {
					console.log(res);
					this.openSuccessModal()
					setTimeout(() => {
						this.router.navigate(['/cursos']);
					}, 2000);
				},
				error: (e) => console.error(e)
			});
	}
	deleteElement(): void {
		this.cursoService.delete(this.currentElement.id)
			.subscribe({
				next: (res) => {
					console.log(res);
					//this.router.navigate(['/cursos']);

				},
				error: (e) => console.error(e)
			});
	}

	idTema = this.temaService.get(this.currentElement)

	selectedTemaId: number = 0;
	materialesTema?: Material[] = [];

	retrieveMaterialesPorCurso(): void {
		this.materialService.findByTema(this.selectedTemaId)
			.subscribe({
				next: (data) => {
					this.materialesTema = data;
					console.log(this.materialesTema);
				},
			});
	};

	private previousTemaId: any;

	asignarTemaId(idTema: any) {
		if (idTema !== this.previousTemaId) {
			this.selectedTemaId = idTema
			this.retrieveMaterialesPorCurso()
			this.previousTemaId = idTema;
		}
	}

	openSuccessModal(): void {
		this.showModal = true;
	}
	
	regresar(): void {
		this.router.navigate(['/cursos']);
	}

	closeSuccessModal(): void {
		this.showModal = false;
	}

}



