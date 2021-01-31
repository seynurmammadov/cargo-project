import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http:HttpClient, private  global:GlobalService) { }
  create(body){
    return this.http.post(`${this.global.path}Order`,body);
  }
  update(body){
    return this.http.put(`${this.global.path}Order/${body.get("id")}`,body);
  }
  delete(id){
    return this.http.delete(`${this.global.path}Order/${id}`);
  }
}
