import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../global/global.service';
import {Observable} from 'rxjs/internal/Observable';

import {UserVM} from '../../models/UserVM';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private  global:GlobalService) { }

  get():Observable<UserVM>{
    return this.http.get<UserVM>(`${this.global.path}User`);
  }
  send(str){
    return this.http.get<any>(`${this.global.path}User/forgot/${str}`);
  }
  restore(body){
    return this.http.put<any>(`${this.global.path}Reset/${body.get("id")}`,body);
  }
}
