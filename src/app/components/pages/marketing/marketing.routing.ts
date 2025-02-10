import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouponComponent } from './coupon/coupon.component';
import { RecommendItemComponent } from './recommend-item/recommend-item.component';
import { BoughtTogetherItemComponent } from './bought-together-item/bought-together-item.component';

const lookuproutes: Routes = [
    { path: 'coupon', component: CouponComponent, title: "Coupon" },
    { path: 'recommend', component: RecommendItemComponent, title: "Recommend Item" },
    { path: 'bought-together', component: BoughtTogetherItemComponent, title: "Bought Together Item" },
];

@NgModule({
    imports: [RouterModule.forChild(lookuproutes)],
    exports: [RouterModule]
})
export class MarketingRoutingModule { }
