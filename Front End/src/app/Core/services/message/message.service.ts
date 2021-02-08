import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../global/global.service';
import {Observable} from 'rxjs/internal/Observable';
import {MessageUser} from '../../models/MessageUser';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http:HttpClient, private  global:GlobalService) { }

  get():Observable<MessageUser[]>{
    return this.http.get<MessageUser[]>(`${this.global.path}Messages`);
  }

  create(body){
    return this.http.post(`${this.global.path}Messages/user`,body);
  }
  send(body){
    return this.http.post(`${this.global.path}Messages/${body.get("id")}`,body);
  }
  delete(id){
    return this.http.delete(`${this.global.path}Messages/${id}`);
  }
}
