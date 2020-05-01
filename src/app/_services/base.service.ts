import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';
import { Constant } from '../constants/constants';


@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) { }

  get(url): Observable<any> {
    return this.http.get<any>(`${Constant.DOMAIN}${url}`);
  }
}
