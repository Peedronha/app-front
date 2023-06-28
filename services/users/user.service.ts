import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<User> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<User>(`${environment.rooturl}/users/signup`, JSON.stringify(user), { headers });
  }

  getUser(): Promise<string> {
    return new Promise((resolve, reject) => {
      const userName = '';
      resolve(userName);
    }
    );
  }

}
