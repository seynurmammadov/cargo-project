import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../global/global.service';
import {Observable} from 'rxjs/internal/Observable';
import {City} from '../../../models/City';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(private http:HttpClient, private  global:GlobalService) { }

  getCities():Observable<City[]>{
    return this.http.get<City[]>(`${this.global.path}City`);
  }
  createCity(body){
    return this.http.post(`${this.global.path}City`,body);
  }
  updateCity(body){
    return this.http.put(`${this.global.path}City/${body.id}`,body);
  }
  deleteCity(id){
    return this.http.delete(`${this.global.path}City/${id}`);
  }
}
