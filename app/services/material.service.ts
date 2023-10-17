import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso.model';
import { Tema } from '../models/tema.model';
import { Material } from '../models/material.model';

const baseUrl = 'http://localhost:4200/api/materiales';


@Injectable({
  providedIn: 'root'
})

export class MaterialService {

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Material[]> {
    return this.http.get<Material[]>(baseUrl);
  }
  get(id: any): Observable<Material> {
    return this.http.get<Material>(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
	console.log(data);
	//Conversione a form data
	//const formData = new FormData();
	//formData.append('title', <string>data.title);
    //formData.append('status', <string>data.status);
	//formData.append('content', <string>data.content);
    return this.http.post(`${baseUrl}`, data, {responseType: 'text'});
  }
  update(id: any, data: Material): Observable<any> {
	//Conversione a form data
	const bodyData = {
		"id": id,
    	"titulo": data.titulo,
		"costo": data.costo,
		"curso": data.curso,
		"stock": data.stock,
		'seleccionado': data.seleccionado
	};
    return this.http.put(`${baseUrl}`, bodyData, {responseType: 'text'});
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`, {responseType: 'text'});
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(titulo: any): Observable<Material> {
    return this.http.get<Material>(`${baseUrl}?titulo=${titulo}`);
  }
  findByTema(id_curso: any): Observable<Material[]> {
    return this.http.get<Material[]>(`${baseUrl}/curso/${id_curso}`);
  }

}
