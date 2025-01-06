import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../../core/shared/material/material.module';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../core/shared/component/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pages',
    imports: [MaterialModule, RouterOutlet, SidebarComponent, CommonModule],
    templateUrl: './pages.component.html',
    styleUrl: './pages.component.scss'
})
export class PagesComponent implements OnInit {

    collapsed = signal(false)
    sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px')

    router = inject(Router);
    userData: any = localStorage.getItem('userData')

    ngOnInit(): void {
        if (this.userData) {
            this.userData = JSON.parse(this.userData);
            this.userData.userName = this.userData.userName.charAt(0).toUpperCase() + this.userData.userName.slice(1);
        }
    }

    getBackgroundColor(name: string): string {
        const colors = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF'];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
      }

    logout() {
        localStorage.removeItem("token")
        this.router.navigate(['/auth/login']);
    }
}
