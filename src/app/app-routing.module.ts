import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {LikedComponent} from "./liked/liked.component";
import {LoginComponent} from "./login/login.component";
import {ShopComponent} from "./shop/shop.component";
import {ProductInformationComponent} from "./product-information/product-information.component";

const routes: Routes = [
  { path:'login', component:LoginComponent},
  { path: '', redirectTo:'home', pathMatch:'full'},
  { path: '', component:HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'productinfo/:id', component: ProductInformationComponent },
  { path: 'shoppingcart', component: ShoppingCartComponent},
  { path: 'liked', component: LikedComponent},
  { path: 'shop', component: ShopComponent},
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
