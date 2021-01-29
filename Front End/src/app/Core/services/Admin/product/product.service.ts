import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../global/global.service';
import {Observable} from 'rxjs/internal/Observable';
import {Product} from '../../../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http:HttpClient, private  global:GlobalService) { }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.global.path}Product`);
  }
  getProductsActive():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.global.path}Product/active`);
  }
  createProduct(body){
    return this.http.post(`${this.global.path}Product`,body);
  }
  updateProduct(body){
    return this.http.put(`${this.global.path}Product/${body.id}`,body);
  }
  deleteProduct(id){
    return this.http.delete(`${this.global.path}Product/${id}`);
  }
}
