import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../global/global.service';
import {Observable} from 'rxjs/internal/Observable';
import {CountryData} from '../../../../Admin/countries-all/CountryData';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http:HttpClient, private  global:GlobalService) { }

  getCountries():Observable<CountryData[]>{
    return this.http.get<CountryData[]>(`${this.global.path}Country`);
  }
  getCountriesActive():Observable<CountryData[]>{
    return this.http.get<CountryData[]>(`${this.global.path}Country/active`);
  }
  getWithTariffs():Observable<CountryData[]>{
    return this.http.get<CountryData[]>(`${this.global.path}Country/active/tariff`);
  }
  createCountry(body:FormData){
    return this.http.post(`${this.global.path}Country`,body );
  }
  updateCountry(body:FormData){
    return this.http.put(`${this.global.path}Country/${body.get("id")}`,body);
  }
  deleteCountry(id){
    return this.http.delete(`${this.global.path}Country/${id}`);
  }
}
