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

            {
                path: 'lookup',
                loadChildren: () => import('../pages/lookup/lookup.module').then(m => m.LookUpModule),
            },

            {
                path: 'marketing',
                loadChildren: () => import('../pages/marketing/marketing.module').then(m => m.MarketingModule),
            },
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
