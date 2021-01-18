import { Injectable } from '@angular/core';
import {GlobalService} from '../../Core/services/global/global.service';
import {Register} from './register';
import {PrivateRegister} from './PrivateRegister';
import {catchError} from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  path:string;
  pathPostPrivate:string;
  pathPostBusiness:string;

  constructor(private http:HttpClient,private global:GlobalService) {
    this.path=global.path+"Auth/register"
    this.pathPostPrivate=global.path+"Auth/register-private"
    this.pathPostBusiness=global.path+"Auth/register-business"
  }

  getRegister():Observable<Register>{
    return this.http.get<Register>(this.path)
  }

  PostRegisterPrivate(body){
    return this.http.post(this.pathPostPrivate,body)
  }

  PostRegisterBusiness(body){
    return this.http.post(this.pathPostBusiness,body)
  }


}
