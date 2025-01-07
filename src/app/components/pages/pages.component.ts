import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../../core/shared/material/material.module';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../core/shared/component/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth/authService/auth.service';

@Component({
    selector: 'app-pages',
    imports: [MaterialModule, RouterOutlet, SidebarComponent, CommonModule],
    templateUrl: './pages.component.html',
    styleUrl: './pages.component.scss'
})
export class PagesComponent implements OnInit {

    collapsed = signal(false)
    sidenavWidth = computed(() => this.collapsed() ? '110px' : '250px')

    router = inject(Router);
    userData: any = localStorage.getItem('userData')

    toster = inject(ToastrService);
    authService = inject(AuthService);


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
}
