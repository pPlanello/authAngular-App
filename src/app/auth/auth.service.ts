import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewUser } from '../shared/models/newUser.model';
import { User } from '../shared/models/user.model';
import { UserAuthResponse } from '../shared/models/UserAuthResponse.model';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user!: User;

  get user() {
    return {... this._user};
  }

  constructor(private http: HttpClient) { }

  /**
   * POST to login user
   * @param email
   * @param password
   * @returns body {@link UserAuthResponse}
   */
  login(email: string, password: string): Observable<UserAuthResponse> {
    const user = {email, password};
    return this.http.post<UserAuthResponse>(`${environment.baseUrl}/${environment.endpoints.auth}/`, user)
        .pipe(
          tap(resp => {
            if (resp.ok) {
              this._user = {
                name: resp.name!,
                id: resp.id!
              }
            }
          }),
          catchError(err => of(err.error))
        );
  }

  /**
   * POST to register user
   * @param user
   * @returns body {@link UserAuthResponse}
   */
  register(user: NewUser): Observable<UserAuthResponse> {
    return this.http.post<UserAuthResponse>(`${environment.baseUrl}/${environment.endpoints.auth}/new`, user);
  }

  getToken() {
    return this.http.get(`${environment.baseUrl}/${environment.endpoints.auth}/renew`);
  }
}
