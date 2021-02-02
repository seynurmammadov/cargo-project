import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../global/global.service';
import {Observable} from 'rxjs/internal/Observable';
import {Status} from '../../models/Status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  constructor(private http:HttpClient, private  global:GlobalService) { }
  get():Observable<Status[]>{
    return this.http.get<Status[]>(`${this.global.path}Status`);
  }
  update(body){
    return this.http.put(`${this.global.path}Status/${body.get("id")}`,body);
  }
}
