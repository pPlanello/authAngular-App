import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email ]],
    password: ['', [Validators.required, Validators.minLength(6) ]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {

    const {email, password} = this.myForm.value;

    this.authService.login(email, password).subscribe(resp => {
      if (resp.ok) {
        this.router.navigateByUrl('./home');
      } else {
        Swal.fire('Error', resp.msg, 'error');
      }
    });
  }
}
