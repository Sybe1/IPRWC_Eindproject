import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {ExtraComponent} from "./extra/extra.component";
import {LikedComponent} from "./liked/liked.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'extra', component: ExtraComponent},
  { path: 'shoppingcart', component: ShoppingCartComponent},
  { path: 'liked', component: LikedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
