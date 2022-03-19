import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(protected http: HttpClient) { }

  login(data): Observable<any> {
    return this.http.post('http://localhost:3000/api/login', data,
    {withCredentials: true})
  }

  register(data): Observable<any>{
    return this.http.post('http://localhost:3000/api/register', data)
  }
}
