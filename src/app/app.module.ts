import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './view/navbar/navbar.component';
import { HomeComponent } from './view/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ShoppingCartComponent } from './view/shopping-cart/shopping-cart.component';
import { LikedComponent } from './view/liked/liked.component';
import { ShopComponent } from './view/shop/shop.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialogModule} from "@angular/material/dialog";
import { PopUpUpdateProductComponent } from './view/shop/pop-up-update-product/pop-up-update-product.component';
import {MatInputModule} from "@angular/material/input";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterClothingTypeComponent } from './view/shop/filter-clothing-type/filter-clothing-type.component';
import { FilterTargetAudienceComponent } from './view/shop/filter-target-audience/filter-target-audience.component';
import { LoginComponent } from './view/authentication/login/login.component';
import {CustomerInterceptorInterceptor} from "./conf/customer-interceptor.interceptor";
import { LatestProductComponent } from './view/home/latest-product/latest-product.component';
import { ProductComponent } from './view/product/product.component';
import {NgOptimizedImage} from "@angular/common";
import {ItemAddedToShoppingCartComponent} from "./view/product/item-added-to-shopping-cart/item-added-to-shopping-cart.component";
import { BoughtItemsComponent } from './view/shopping-cart/bought-items/bought-items.component';
import { ProductThumbnailShopComponent } from './view/shop/product-thumbnail-shop/product-thumbnail-shop.component';
import { ProductShopInformationComponent } from './view/shop/product-shop-information/product-shop-information.component';
import { HeaderPageComponent } from './view/header-page/header-page.component';
import { SignUpComponent } from './view/authentication/sign-up/sign-up.component';
import {LoginToDoActionComponent} from "./view/product/login-to-do-action/login-to-do-action.component";
import { LikedItemsComponent } from './view/liked/liked-items/liked-items.component';
import { AuthenticationComponent } from './view/authentication/authentication.component';
import {LogoutComponent} from "./view/authentication/logout/logout.component";
import { ProductInformationComponent } from './view/product/product-information/product-information.component';
import {ProductThumbnailComponent} from "./view/product/product-thumbnail/product-thumbnail.component";
import { ChoosingAmountProductComponent } from './view/product/choosing-amount-product/choosing-amount-product.component';
import { EditDeleteProductComponent } from './view/shop/edit-delete-product/edit-delete-product.component';
import { AddProductComponent } from './view/shop/add-product/add-product.component';
import { TopOfTableComponent } from './view/shopping-cart/top-of-table/top-of-table.component';
import { InformationProductShoppingCartComponent } from './view/shopping-cart/information-product-shopping-cart/information-product-shopping-cart.component';
import { PriceAccumulatedComponent } from './view/shopping-cart/price-accumulated/price-accumulated.component';
import { OrderComponent } from './view/order/order.component';
import {RecaptchaModule} from "ng-recaptcha";
import { PopUpUpdateOrderComponent } from './view/order/pop-up-update-order/pop-up-update-order.component';
import { AdminComponent } from './view/admin/admin.component';
import { ClothingTypeSectionComponent } from './view/admin/clothing-type-section/clothing-type-section.component';
import { PopUpUpdateClothingTypeComponent } from './view/admin/clothing-type-section/pop-up-update-clothing-type/pop-up-update-clothing-type.component';
import { PopUpUpdateTargetAudienceComponent } from './view/admin/target-audience-section/pop-up-update-target-audience/pop-up-update-target-audience.component';
import {TargetAudienceSectionComponent} from "./view/admin/target-audience-section/target-audience-section.component";
import {PopUpUpdateUserComponent} from "./view/user/pop-up-update-user/pop-up-update-user.component";
import {UserComponent} from "./view/user/user.component";
import {UserInformationComponent} from "./view/user/user-information/user-information.component";
import {UserInformationAdminComponent} from "./view/user/user-information-admin/user-information-admin.component";
import {NoInformationFoundComponent} from "./view/no-information-found/no-information-found.component";
import {
  TargetAudienceInformationComponent
} from "./view/admin/target-audience-section/target-audience-information/target-audience-information.component";
import {
  ClothingTypeInformationComponent
} from "./view/admin/clothing-type-section/clothing-type-information/clothing-type-information.component";
import {OrderInformationComponent} from "./view/order/order-information/order-information.component";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ShoppingCartComponent,
    LikedComponent,
    ShopComponent,
    PopUpUpdateProductComponent,
    FilterClothingTypeComponent,
    FilterTargetAudienceComponent,
    LoginComponent,
    LatestProductComponent,
    ProductComponent,
    ItemAddedToShoppingCartComponent,
    BoughtItemsComponent,
    ProductThumbnailComponent,
    ProductShopInformationComponent,
    HeaderPageComponent,
    LogoutComponent,
    SignUpComponent,
    LoginToDoActionComponent,
    LikedItemsComponent,
    AuthenticationComponent,
    LogoutComponent,
    ProductInformationComponent,
    ProductThumbnailComponent,
    ProductThumbnailShopComponent,
    ChoosingAmountProductComponent,
    EditDeleteProductComponent,
    AddProductComponent,
    TopOfTableComponent,
    InformationProductShoppingCartComponent,
    PriceAccumulatedComponent,
    OrderComponent,
    PopUpUpdateOrderComponent,
    AdminComponent,
    TargetAudienceSectionComponent,
    ClothingTypeSectionComponent,
    PopUpUpdateClothingTypeComponent,
    PopUpUpdateTargetAudienceComponent,
    PopUpUpdateUserComponent,
    UserComponent,
    UserInformationComponent,
    UserInformationAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatOptionModule,
    MatSelectModule,
    NgbModule,
    NgOptimizedImage,
    RecaptchaModule,
    NoInformationFoundComponent,
    TargetAudienceInformationComponent,
    ClothingTypeInformationComponent,
    OrderInformationComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomerInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
