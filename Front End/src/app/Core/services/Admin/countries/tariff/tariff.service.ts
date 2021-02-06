import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../../global/global.service';
import {Observable} from 'rxjs/internal/Observable';
import {Tariff} from '../../../../models/Tariff';

@Injectable({
  providedIn: 'root'
})
export class TariffService {
  constructor(private http:HttpClient, private  global:GlobalService) { }

  get(id):Observable<Tariff[]>{
    return this.http.get<Tariff[]>(`${this.global.path}Tariff/${id}`);
  }
  getWithId(id):Observable<Tariff>{
    return this.http.get<Tariff>(`${this.global.path}Tariff/withId/${id}`);
  }
  create(body:FormData){
    return this.http.post(`${this.global.path}Tariff`,body );
  }
  update(body:FormData){
    return this.http.put(`${this.global.path}Tariff/${body.get("id")}`,body);
  }
  delete(id){
    return this.http.delete(`${this.global.path}Tariff/${id}`);
  }
}
