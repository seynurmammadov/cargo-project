import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../../global/global.service';
import {PriceList} from '../../../../models/PriceList';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  constructor(private http:HttpClient, private  global:GlobalService) { }

  get(id):Observable<PriceList[]>{
    return this.http.get<PriceList[]>(`${this.global.path}Price/${id}`);
  }
  create(body:FormData){
    return this.http.post(`${this.global.path}Price`,body );
  }
  update(body:FormData){
    return this.http.put(`${this.global.path}Price/${body.get("id")}`,body);
  }
  delete(id){
    return this.http.delete(`${this.global.path}Price/${id}`);
  }
}
