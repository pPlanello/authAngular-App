import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4) ]],
    email: ['', [Validators.required, Validators.email ]],
    password: ['', [Validators.required, Validators.minLength(6) ]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  register() {
    this.authService.register(this.myForm.value).subscribe(resp => {
      if (resp.ok) {
        this.router.navigateByUrl('./home');
        Swal.fire('Success', resp.msg, 'success');
      } else {
        Swal.fire('Error', resp.msg, 'error');
        this.router.navigateByUrl('./register');
      }
    });
  }

}
