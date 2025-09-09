import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API ='https://iconistar.net/ICON/ICON/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(username:string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'Admin/Index',
      {
        username: username,
        password: password,
      },
      httpOptions
    );
  }

  ulogin(regid: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'User/Index',
      {
        regid: regid,
        password: password,
      },
      httpOptions
    );
  }

 

}
