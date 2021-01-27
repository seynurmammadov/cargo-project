import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../global/global.service';
import {Observable} from 'rxjs/internal/Observable';
import {CountryData} from '../../../../Admin/countries-all/CountryData';

@Injectable({
  providedIn: 'root'
})
export class CountryInfoService {
  constructor(private http:HttpClient, private  global:GlobalService) { }
  getCountry(id):Observable<CountryData>{
    return this.http.get<CountryData>(`${this.global.path}Country/${id}`);
  }
  createCountryInfo(body:FormData){
    return this.http.post(`${this.global.path}CountryInfo`,body);
  }
  updateCountryInfo(body:FormData){
    return this.http.put(`${this.global.path}CountryInfo/${body.get("id")}`,body);
  }
  deleteCountryInfo(id){
    return this.http.delete(`${this.global.path}CountryInfo/${id}`);
  }

}
