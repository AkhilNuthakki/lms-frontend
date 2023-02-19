import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginUserRequest } from 'src/app/interfaces/LoginUserRequest';
import { RegisterUserRequest } from 'src/app/interfaces/RegisterUserRequest';
import { User } from 'src/app/interfaces/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient) { }

  registerUser(requestbody: RegisterUserRequest): Observable<any> {
    return this.http.post('/api/v1.0/lms/users/register', requestbody, {responseType: 'text'});
  }

  loginUser(requestbody: LoginUserRequest): Observable<any> {
    return this.http.post('/api/v1.0/lms/users/login', requestbody, {responseType: 'json'});
  }

  setUser(user: User | undefined){
    if(user){
      this.user.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
    }
  }

  getUser(): Observable<User | undefined> {
    const userData = localStorage.getItem('userData');
    if(userData){
      this.user.next(JSON.parse(userData));
    }
    return this.user;
  }

  removeUser() {
    localStorage.removeItem('userData');
  }

}
