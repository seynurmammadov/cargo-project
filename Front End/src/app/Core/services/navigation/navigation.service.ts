import { Injectable  } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../global/global.service';
import {UserNavVM} from '../../../navbar/models/UserNavVM';
import {Observable} from 'rxjs/internal/Observable';
import {Languages} from '../../../navbar/models/languages';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private http:HttpClient, private  global:GlobalService) {
  }

  getUser():Observable<UserNavVM>{
    return this.http.get<UserNavVM>(`${this.global.path}Navbar/get-user-info`);
  }

}
