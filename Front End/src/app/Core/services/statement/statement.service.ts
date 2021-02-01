import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../global/global.service';
import {Observable} from 'rxjs/internal/Observable';
import {Cargo} from '../../models/Cargo';

@Injectable({
  providedIn: 'root'
})
export class StatementService {
  constructor(private http:HttpClient, private  global:GlobalService) { }
  get():Observable<Cargo[]>{
    return this.http.get<Cargo[]>(`${this.global.path}Statement`);
  }
  create(body){
    return this.http.post(`${this.global.path}Statement`,body);
  }
  update(body){
    return this.http.put(`${this.global.path}Statement/${body.get("id")}`,body);
  }
  delete(id){
    return this.http.delete(`${this.global.path}Statement/${id}`);
  }
}
