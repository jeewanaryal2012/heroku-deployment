import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';
import { Constant } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(url, data) {
    console.log(data);
    return this.http.post<User>(`${Constant.DOMAIN}${url}`, data);
  }
}
