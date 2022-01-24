import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserAuthResponse } from '../shared/models/UserAuthResponse.model';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from '../shared/models/User.model';
import { NewUser } from '../shared/models/NewUser.model';

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
   *
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
              this.saveTokenLocalStorage(resp);
            }
          }),
          catchError(err => of(err.error))
        );
  }

  /**
   * POST to register user
   *
   * @param user
   * @returns body {@link UserAuthResponse}
   */
  register(user: NewUser): Observable<UserAuthResponse> {
    return this.http.post<UserAuthResponse>(`${environment.baseUrl}/${environment.endpoints.auth}/new`, user)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            this.saveTokenLocalStorage(resp);
          }
        }),
        catchError(err => of(err.error))
      );
  }

  /**
   * Verify Valid Token
   *
   * @returns {@link boolean} correct token
   */
  validToken(): Observable<boolean> {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<UserAuthResponse>(`${environment.baseUrl}/${environment.endpoints.auth}/renew`, {headers})
      .pipe(
        map(resp => {
          this.saveTokenLocalStorage(resp);
          return resp.ok
        }),
        catchError( err => of(false))
      );
  }

  /**
   * Clear local storage
   */
  logout(): void {
    localStorage.clear();
  }

  /**
   * Save token in local storage
   *
   * @param resp {@link UserAuthResponse}
   */
  private saveTokenLocalStorage(resp: UserAuthResponse): void {
    localStorage.setItem('token', resp.token!);
    this._user = { name: resp.name!, id: resp.id! }
  }
}
