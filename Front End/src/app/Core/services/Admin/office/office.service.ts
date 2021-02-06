import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../global/global.service';
import {Observable} from 'rxjs/internal/Observable';
import {Office} from '../../../models/Office';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  constructor(private http:HttpClient, private  global:GlobalService) { }

  getOffices():Observable<Office[]>{
    return this.http.get<Office[]>(`${this.global.path}Office`);
  }
  getActive():Observable<Office[]>{
    return this.http.get<Office[]>(`${this.global.path}Office/active`);
  }
  createOffice(body){
    return this.http.post(`${this.global.path}Office`,body);
  }
  updateOffice(body){
    return this.http.put(`${this.global.path}Office/${body.id}`,body);
  }
  deleteOffice(id){
    return this.http.delete(`${this.global.path}Office/${id}`);
  }
}
