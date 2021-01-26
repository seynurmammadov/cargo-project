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
    return this.http.get<CountryData[]>(`${this.global.path}Country/get`);
  }
  createCountry(body){
    return this.http.post(`${this.global.path}Country/create`,body);
  }
}
