import { Component, computed, inject, signal } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth/authService/auth.service';

@Component({
  selector: 'app-notfound',
  imports: [MaterialModule, CommonModule],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss'
})
export class NotfoundComponent {
  collapsed = signal(false)
  sidenavWidth = computed(() => this.collapsed() ? '110px' : '250px')

  router = inject(Router);
  userData: any = localStorage.getItem('userData')
  toster = inject(ToastrService);
  authService=inject(AuthService);

  ngOnInit(): void {
    if (this.userData) {
      this.userData = JSON.parse(this.userData);
      this.userData.userName = this.userData.userName.charAt(0).toUpperCase() + this.userData.userName.slice(1);
    }
  }

  logout() {
    this.authService.logout();
    this.toster.success("User Logout Successfully.")
  }

  back() {
    history.back();
  }
}
