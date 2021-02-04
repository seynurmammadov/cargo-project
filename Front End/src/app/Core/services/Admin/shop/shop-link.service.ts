import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../global/global.service';
import {Observable} from 'rxjs/internal/Observable';
import {Shop} from '../../../models/Shop';

@Injectable({
  providedIn: 'root'
})
export class ShopLinkService {
  constructor(private http:HttpClient, private  global:GlobalService) { }
  get(id):Observable<Shop>{
    return this.http.get<Shop>(`${this.global.path}Shop/${id}`);
  }
  create(body:FormData){
    return this.http.post(`${this.global.path}ShopLink`,body);
  }
  update(body:FormData){
    return this.http.put(`${this.global.path}ShopLink/${body.get("id")}`,body);
  }
  delete(id){
    return this.http.delete(`${this.global.path}ShopLink/${id}`);
  }
}
