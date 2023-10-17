import { Tema } from '../models/tema.model';
import { Material } from './material.model';

export class Curso {
	id?: number;
	nombre?: string;	
	tema: Tema = new Tema;
	fechaInicio?: Date;
	idDocente?: number;
	materiales?: Material[]
}

export { Tema };
