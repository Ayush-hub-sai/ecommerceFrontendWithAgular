import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemsComponent } from './lookup/items/items.component';
import { CategoriesComponent } from './lookup/categories/categories.component';
import { PagesComponent } from './pages.component';


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
            { path: 'items', component: ItemsComponent, title: "Items" },
            { path: 'categories', component: CategoriesComponent, title: "Category" },
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
