import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {ExtraComponent} from "./extra/extra.component";
import {LikedComponent} from "./liked/liked.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {LoginComponent} from "./login/login.component";
import {ProductComponent} from "./product/product.component";

const routes: Routes = [
  { path:'login', component:LoginComponent},
  { path: '', redirectTo:'login', pathMatch:'full'},
  { path: '', component:HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'extra', component: ExtraComponent},
  { path: 'shoppingcart', component: ShoppingCartComponent},
  { path: 'liked', component: LikedComponent},
  { path: 'shop', component: ProductComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
