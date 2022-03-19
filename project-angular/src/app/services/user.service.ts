import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  all(): Observable<any>{
    return this.http.get<any>('http://localhost:3000/api/users');
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>('http://localhost:3000/api/users/delete/'+id);

  }

  update(id: number, data): Observable<User>{
    return this.http.put<User>('http://localhost:3000/api/users/update/'+id,data);
  }

  get(id: number): Observable<User>{
    return this.http.get<User>("http://localhost:3000/api/users/"+id)
  }

  create(data): Observable<User>{
    return this.http.post<User>("http://localhost:3000/api/users/create",data);
  }
}

