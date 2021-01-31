import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../global/global.service';
import {Observable} from 'rxjs/internal/Observable';
import {Cargo} from '../../models/Cargo';
import {AppUser} from '../../../Admin/Models/AppUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private  global:GlobalService) { }

  get():Observable<AppUser>{
    return this.http.get<AppUser>(`${this.global.path}User`);
  }

}
