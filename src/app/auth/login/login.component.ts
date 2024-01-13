import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = fb.group({
      email: ['student@angular-university.io', [Validators.required]],
      password: ['password', [Validators.required]],
    });
  }

  ngOnInit() {}

  login() {
    const { email, password } = this.form.value;
    this.auth.login(email, password).subscribe(
      ({ authJwtToken }) => {
        localStorage.setItem('authJwtToken', authJwtToken);
        this.router.navigate(['courses']);
      },
      (err) => {
        console.log('Login failed', err);
        alert('Login failed');
      }
    );
  }
}
