import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../global/global.service';
import {Observable} from 'rxjs/internal/Observable';
import {Cargo} from '../../models/Cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  constructor(private http:HttpClient, private  global:GlobalService) { }

  getEnded():Observable<Cargo[]>{
    return this.http.get<Cargo[]>(`${this.global.path}Ended`);
  }
  get(str):Observable<Cargo[]>{
    return this.http.get<Cargo[]>(`${this.global.path}Cargo/${str}`);
  }
  getUserId(str,id):Observable<Cargo[]>{
    return this.http.get<Cargo[]>(`${this.global.path}Cargo/${str}/${id}`);
  }
  getWithId(id):Observable<Cargo[]>{
    return this.http.get<Cargo[]>(`${this.global.path}UserStatements/${id}`);
  }
  getWithParcelId(id):Observable<Cargo>{
    return this.http.get<Cargo>(`${this.global.path}Cargo/info/${id}`);
  }
  create(body){
    return this.http.post(`${this.global.path}Cargo`,body);
  }
  getInvoice():Observable<Cargo[]>{
    return this.http.get<Cargo[]>(`${this.global.path}WaitingInvoice`);
  }
  updateInvoice(body){
    return this.http.put(`${this.global.path}WaitingInvoice/${body.get("id")}`,body);
  }
  getAll():Observable<Cargo[]>{
    return this.http.get<Cargo[]>(`${this.global.path}InAnbar`);
  }
  updateInAnbar(body){
    return this.http.put(`${this.global.path}Cargo/${body.get("id")}`,body);
  }
/*
  delete(id){
    return this.http.delete(`${this.global.path}Cargo/${id}`);
  }*/
}
