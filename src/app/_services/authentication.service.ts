import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('jwt')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    console.log(this.currentUserSubject.value);
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`http://localhost:4040/login`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        console.log(user);
        if (user && user.accessToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // localStorage.setItem('currentUser', JSON.stringify(user));
          // this.currentUserSubject.next(user);
          localStorage.setItem('jwt', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('jwt');
    this.currentUserSubject.next(null);
  }

  register() {
    const users = {
      "firstName": "Sam",
      "lastName": "Tik",
      "email": 'emaail',
      "phone": "999-000-2222",
      "password": "passsam"
    };
    return this.http.post<any>(`http://localhost:4040/register`, users);
    // .pipe(map(user => {
    //   // login successful if there's a jwt token in the response
    //   console.log(user);
    //   // if (user && user.accessToken) {
    //   //   // store user details and jwt token in local storage to keep user logged in between page refreshes
    //   //   // localStorage.setItem('currentUser', JSON.stringify(user));
    //   //   // this.currentUserSubject.next(user);
    //   //   localStorage.setItem('jwt', JSON.stringify(user));
    //   //   this.currentUserSubject.next(user);
    //   // }

    //   //return user;
    // }));
  }
}
