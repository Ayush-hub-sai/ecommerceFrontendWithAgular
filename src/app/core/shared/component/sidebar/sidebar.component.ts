import { Component, computed, Input, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterLink, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
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
    {
      label: 'Look Up',
      route: '',
      icon: 'group_work',
      submenu: [
        { label: 'Items', route: 'lookup/items', icon: 'shopping_cart' },
        { label: 'Category', route: 'lookup/categories', icon: 'category' },
        { label: 'Stocks', route: 'lookup/stocks', icon: 'inventory_2' },
      ]
    },
    {
      label: 'Marketing',
      route: '',
      icon: 'local_offer',
      submenu: [
        { label: 'Coupon', route: 'marketing/coupon', icon: 'discount' },
        { label: 'Recommend', route: 'marketing/recommend', icon: 'recommend' },
        { label: 'Bought Together', route: 'marketing/bought-together', icon: 'group_work' },
      ]
    },
    {
      label: 'Configurations',
      route: '',
      icon: 'settings',
      submenu: [
        { label: 'Common Setting', route: 'common', icon: 'settings' },
        { label: 'Global Setting', route: 'global', icon: 'settings' },
      ]
    },
    { label: 'Orders', route: 'order', icon: 'reorder' },
  ];

  constructor() { }

  ngOnInit(): void {
    //  this.routerList.shift()
  }

  trackByFn(index: number, item: any): number {
    return item.route; // You can track by route or any unique property of your items
  }
}
