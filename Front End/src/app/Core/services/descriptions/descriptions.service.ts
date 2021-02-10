import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {CountryData} from '../../../Admin/countries-all/CountryData';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class DescriptionsService {

  constructor(private http:HttpClient, private  global:GlobalService) { }
  getBio():Observable<any>{
    return this.http.get<any>(`${this.global.path}Bio`);
  }
  updateBio(body:FormData){
    return this.http.put(`${this.global.path}Bio/${body.get("id")}`,body);
  }
  getAbout():Observable<any>{
    return this.http.get<any>(`${this.global.path}About`);
  }
  updateAboutt(body:FormData){
    return this.http.put(`${this.global.path}About/${body.get("id")}`,body);
  }
  getContactDesc():Observable<any>{
    return this.http.get<any>(`${this.global.path}ContactNotice`);
  }
  updateContactDesc(body:FormData){
    return this.http.put(`${this.global.path}ContactNotice/${body.get("id")}`,body);
  }
}
