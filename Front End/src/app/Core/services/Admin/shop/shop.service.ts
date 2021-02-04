import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../global/global.service';
import {Observable} from 'rxjs/internal/Observable';
import {CountryData} from '../../../../Admin/countries-all/CountryData';
import {Shop} from '../../../models/Shop';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  constructor(private http:HttpClient, private  global:GlobalService) { }

  get():Observable<Shop[]>{
    return this.http.get<Shop[]>(`${this.global.path}Shop`);
  }
  getActive():Observable<Shop[]>{
    return this.http.get<Shop[]>(`${this.global.path}Shop/active`);
  }
  create(body:FormData){
    return this.http.post(`${this.global.path}Shop`,body );
  }
  update(body:FormData){
    return this.http.put(`${this.global.path}Shop/${body.get("id")}`,body);
  }
  delete(id){
    return this.http.delete(`${this.global.path}Shop/${id}`);
  }
}
