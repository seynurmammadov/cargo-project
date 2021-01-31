import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {CountryData} from '../../../../Admin/countries-all/CountryData';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../global/global.service';
import {AppUser} from '../../../../Admin/Models/AppUser';

@Injectable({
  providedIn: 'root'
})
export class UserOrderService {

  constructor(private http:HttpClient, private  global:GlobalService) { }
  get(id):Observable<AppUser>{
    return this.http.get<AppUser>(`${this.global.path}UserOrders/${id}`);
  }
  refuse(body){
    return this.http.put(`${this.global.path}UserOrders/${body.get("id")}`,body);
  }
  refuseOrder(body){
    return this.http.put(`${this.global.path}UserOrders/refuse/${body.get("id")}`,"");
  }
  changeStatus(body){
    return this.http.put(`${this.global.path}UserOrders/changeStatus/${body.get("id")}`,"");
  }
}
