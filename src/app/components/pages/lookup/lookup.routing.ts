import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { CategoriesComponent } from './categories/categories.component';
import { StocksComponent } from './stocks/stocks.component';

const lookuproutes: Routes = [
    { path: 'items', component: ItemsComponent, title: "Items" },
    { path: 'categories', component: CategoriesComponent, title: "Categories" },
    { path: 'stocks', component: StocksComponent, title: "Stocks" },
];


@NgModule({
    imports: [RouterModule.forChild(lookuproutes)],
    exports: [RouterModule]
})
export class LookUpRoutingModule { }
