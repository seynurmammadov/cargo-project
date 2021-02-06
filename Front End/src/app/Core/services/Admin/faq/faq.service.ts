import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../global/global.service';
import {FAQ} from '../../../models/FAQ';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http:HttpClient, private  global:GlobalService) { }
  get():Observable<FAQ[]>{
    return this.http.get<FAQ[]>(`${this.global.path}FAQ`);
  }
  getActive():Observable<FAQ[]>{
    return this.http.get<FAQ[]>(`${this.global.path}FAQ/active`);
  }
  create(body:FormData){
    return this.http.post(`${this.global.path}FAQ`,body);
  }
  update(body:FormData){
    return this.http.put(`${this.global.path}FAQ/${body.get("id")}`,body);
  }
  delete(id){
    return this.http.delete(`${this.global.path}FAQ/${id}`);
  }
}
