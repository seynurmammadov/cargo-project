import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalService} from '../../global/global.service';
import {UserData} from '../../../../Admin/users/UserData';
import {Observable} from 'rxjs/internal/Observable';
import {FullPrivateUser} from '../../../../Admin/Models/FullPrivateUser';
import {FullBusinessUser} from '../../../../Admin/Models/FullBusinessUser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient, private  global:GlobalService) { }
  getUsers():Observable<UserData[]>{
    return this.http.get<UserData[]>(`${this.global.path}Users/get`);
  }
  search(body):Observable<UserData[]>{
    return this.http.get<UserData[]>(`${this.global.path}Users/search/${body.id}`);
  }
  ChangeRole(str){
    return this.http.post(`${this.global.path}Users/status`,str);
  }
  getRoles():Observable<string[]>{
    return this.http.get<string[]>(`${this.global.path}Users/get-roles`);
  }
  AddRoles(body){
    return this.http.post(`${this.global.path}Users/change-roles`,body);
  }
  ResetPassword(body){
    return this.http.post(`${this.global.path}Users/reset-password`,body);
  }
  getUserPrivate(id):Observable<FullPrivateUser>{
    const params = new HttpParams()
      .set('id', id)
    return this.http.get<FullPrivateUser>(`${this.global.path}Users/get-private`, { params:params });
  }
  getUserBusiness(id):Observable<FullBusinessUser>{
    const params = new HttpParams()
      .set('id', id)
    return this.http.get<FullBusinessUser>(`${this.global.path}Users/get-business`, { params:params });
  }
}
