import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./view/home/home.component";
import {ShoppingCartComponent} from "./view/shopping-cart/shopping-cart.component";
import {LikedComponent} from "./view/liked/liked.component";
import {ShopComponent} from "./view/shop/shop.component";
import {ProductComponent} from "./view/product/product.component";
import {AuthenticationComponent} from "./view/authentication/authentication.component";
import {OrderComponent} from "./view/order/order.component";
import {RoleGuard} from "./guard/role.guard";
import {AdminComponent} from "./view/admin/admin.component";
import {UserComponent} from "./view/user/user.component";
import {LoggedInGuard} from "./guard/logged-in.guard";

const routes: Routes = [
  { path:'login', component:AuthenticationComponent},
  { path: '', redirectTo:'home', pathMatch:'full'},
  { path: '', component:HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'productinfo/:id', component: ProductComponent },
  { path: 'shoppingcart', component: ShoppingCartComponent},
  { path: 'liked', component: LikedComponent},
  { path: 'orders', component: OrderComponent, canActivate: [RoleGuard, LoggedInGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [RoleGuard, LoggedInGuard]},
  { path: 'shop', component: ShopComponent},
  { path: 'user', component: UserComponent, canActivate: [LoggedInGuard]},
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
