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

/*  get():Observable<Cargo[]>{
    return this.http.get<Cargo[]>(`${this.global.path}Cargo`);
  }*/
  create(body){
    return this.http.post(`${this.global.path}Cargo`,body);
  }
  getInvoice():Observable<Cargo[]>{
    return this.http.get<Cargo[]>(`${this.global.path}WaitingInvoice`);
  }
  updateInvoice(body){
    return this.http.put(`${this.global.path}WaitingInvoice/${body.get("id")}`,body);
  }
  getInAnbar():Observable<Cargo[]>{
    return this.http.get<Cargo[]>(`${this.global.path}InAnbar`);
  }
/*
  delete(id){
    return this.http.delete(`${this.global.path}Cargo/${id}`);
  }*/
}
