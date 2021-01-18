import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  path:string="https://localhost:44387/api/";

  constructor() { }
}
