import { Curso } from "./curso.model";

export class Material {
	id?: number;
	titulo?: string;
	costo?: number;
	curso?: Curso = new Curso;
	stock?: number;
	seleccionado?: boolean;
}
