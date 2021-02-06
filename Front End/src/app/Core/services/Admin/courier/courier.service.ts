import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../global/global.service';
import {Observable} from 'rxjs/internal/Observable';
import {Shop} from '../../../models/Shop';
import {CourierLocation} from '../../../models/CourierLocation';

@Injectable({
  providedIn: 'root'
})
export class CourierService {
  constructor(private http:HttpClient, private  global:GlobalService) { }
  get():Observable<CourierLocation[]>{
    return this.http.get<CourierLocation[]>(`${this.global.path}Courier`);
  }
  getActive():Observable<CourierLocation[]>{
    return this.http.get<CourierLocation[]>(`${this.global.path}Courier/active`);
  }
  create(body:FormData){
    return this.http.post(`${this.global.path}Courier`,body);
  }
  update(body:FormData){
    return this.http.put(`${this.global.path}Courier/${body.get("id")}`,body);
  }
  delete(id){
    return this.http.delete(`${this.global.path}Courier/${id}`);
  }
}
