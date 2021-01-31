import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  constructor(private http:HttpClient, private  global:GlobalService) { }

  add(body){
    return this.http.put(`${this.global.path}Balance/add`,body);
  }
  remove(body){
    return this.http.put(`${this.global.path}Balance/remove`,body);
  }
  /*
   delete(id){
   return this.http.delete(`${this.global.path}Statement/${id}`);
 }*/
}
