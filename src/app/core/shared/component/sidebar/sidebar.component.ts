import { Component, computed, Input, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavItem } from '../../../models/navItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [MaterialModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  sidenavCollapsed = signal(false)
  @Input() set collapsedData(val: boolean) {
    this.sidenavCollapsed.set(val);
  }

  profilePicSize = computed(() => this.sidenavCollapsed() ? '32' : '100')

  routerList: NavItem[] = [
    { label: 'Dashboard', route: 'dashboard', icon: 'dashboard' },
    { label: 'Items', route: 'items', icon: 'shopping_cart' },
    { label: 'Category', route: 'categories', icon: 'category' },
  ];


  constructor() { }

  ngOnInit(): void {
    //  this.routerList.shift()
  }
}
