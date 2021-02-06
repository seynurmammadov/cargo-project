import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../global/global.service';
import {Observable} from 'rxjs/internal/Observable';
import {CourierLocation} from '../../../models/CourierLocation';
import {Service} from '../../../models/Service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient, private  global:GlobalService) { }
  get():Observable<Service[]>{
    return this.http.get<Service[]>(`${this.global.path}Service`);
  }
  getActive():Observable<Service[]>{
    return this.http.get<Service[]>(`${this.global.path}Service/active`);
  }
  create(body:FormData){
    return this.http.post(`${this.global.path}Service`,body);
  }
  update(body:FormData){
    return this.http.put(`${this.global.path}Service/${body.get("id")}`,body);
  }
  delete(id){
    return this.http.delete(`${this.global.path}Service/${id}`);
  }
}
