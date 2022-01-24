import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.authService.validToken()
      .pipe(
        tap(valid => {
          if(!valid) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }

  canLoad(): Observable<boolean> | boolean {
    return this.authService.validToken()
      .pipe(
        tap(valid => {
          if(!valid) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }

}
