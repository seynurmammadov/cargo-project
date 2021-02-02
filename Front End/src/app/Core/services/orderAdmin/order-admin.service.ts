import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../global/global.service';
import {Observable} from 'rxjs/internal/Observable';
import {Order} from '../../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderAdminService {
  constructor(private http:HttpClient, private  global:GlobalService) { }
  get(str):Observable<Order[]>{
    return this.http.get<Order[]>(`${this.global.path}OrderAdmin/${str}`);
  }
}
