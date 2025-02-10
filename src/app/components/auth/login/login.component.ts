import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../core/shared/material/material.module';
import { AuthService } from '../../../core/services/auth/authService/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    MaterialModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toster: ToastrService
  ) {

    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/pages/dashboard']);
    }

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token); // Save the token

          const userData = {
            userName: response.userName
          }

          localStorage.setItem('userData', JSON.stringify(userData)); // Save the token
          this.router.navigate(['dashboard']);
          this.toster.success(response.message)
        },
        error: (err) => {
          this.toster.error("Invalid Credentials")
        },
      });
    }
  }




}
