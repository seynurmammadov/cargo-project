import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../global/global.service';
import {Observable} from 'rxjs/internal/Observable';
import {Flight} from '../../../models/Flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  constructor(private http: HttpClient, private  global: GlobalService) {
  }

  get(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.global.path}Flight`);
  }

  getActive(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.global.path}Flight/active`);
  }

  create(body: FormData) {
    return this.http.post(`${this.global.path}Flight`, body);
  }

  update(body: FormData) {
    return this.http.put(`${this.global.path}Flight/${body.get("id")}`, body);
  }

  delete(id) {
    return this.http.delete(`${this.global.path}Flight/${id}`);
  }
}
