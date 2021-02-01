import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../global/global.service';
import {Observable} from 'rxjs/internal/Observable';
import {Order} from '../../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http:HttpClient, private  global:GlobalService) { }
  get():Observable<Order[]>{
    return this.http.get<Order[]>(`${this.global.path}Order`);
  }
  create(body){
    return this.http.post(`${this.global.path}Order`,body);
  }
}
