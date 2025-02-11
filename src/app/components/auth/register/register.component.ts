import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../core/shared/material/material.module';
import { AuthService } from '../../../core/services/auth/authService/auth.service';
@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    MaterialModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;  

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          // Optionally, redirect the user or show a success message
        },
        error: (err) => {
          console.error('Registration failed', err);
          // Optionally, display a user-friendly error message
        },
        complete: () => {
          console.log('Registration request completed');
        },
      });
    } else {
      console.warn('Form is invalid');
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  
}