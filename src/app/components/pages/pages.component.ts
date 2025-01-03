import { Component, computed, signal } from '@angular/core';
import { MaterialModule } from '../../core/shared/material/material.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../core/shared/component/sidebar/sidebar.component";

@Component({
    selector: 'app-pages',
    imports: [MaterialModule, RouterOutlet, SidebarComponent],
    templateUrl: './pages.component.html',
    styleUrl: './pages.component.scss'
})
export class PagesComponent {
    collapsed = signal(false)
    sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px')
}
