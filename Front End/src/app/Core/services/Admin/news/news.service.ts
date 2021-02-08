import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../global/global.service';
import {News} from '../../../models/News';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private http:HttpClient, private  global:GlobalService) { }
  get():Observable<News[]>{
    return this.http.get<News[]>(`${this.global.path}News`);
  }
  getActiveWithId(id):Observable<News>{
    return this.http.get<News>(`${this.global.path}News/${id}`);
  }
  getActive():Observable<News[]>{
    return this.http.get<News[]>(`${this.global.path}News/active`);
  }
  create(body:FormData){
    return this.http.post(`${this.global.path}News`,body);
  }
  update(body:FormData){
    return this.http.put(`${this.global.path}News/${body.get("id")}`,body);
  }
  delete(id){
    return this.http.delete(`${this.global.path}News/${id}`);
  }
}
