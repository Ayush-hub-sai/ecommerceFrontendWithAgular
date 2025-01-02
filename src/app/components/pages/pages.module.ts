import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemsComponent } from './items/items.component';
import { CategoriesComponent } from './categories/categories.component';
import { PagesRoutingModule } from './pages.routing';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule {}