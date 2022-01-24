import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewUser } from '../shared/models/newUser.model';
import { User } from '../shared/models/user.model';
import { UserAuthResponse } from '../shared/models/UserAuthResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<UserAuthResponse> {
    return this.http.post<UserAuthResponse>(`${environment.baseUrl}/${environment.endpoints.auth}/`, user);
  }

  register(user: NewUser): Observable<UserAuthResponse> {
    return this.http.post<UserAuthResponse>(`${environment.baseUrl}/${environment.endpoints.auth}/new`, user);
  }

  getToken() {
    return this.http.get(`${environment.baseUrl}/${environment.endpoints.auth}/renew`);
  }
}
