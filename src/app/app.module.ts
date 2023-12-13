import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ExtraComponent } from './extra/extra.component';
import { LikedComponent } from './liked/liked.component';
import { ProductComponent } from './product/product.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatDialogModule} from "@angular/material/dialog";
import { PopUpUpdateProductComponent } from './pop-up-update-product/pop-up-update-product.component';
import {MatInputModule} from "@angular/material/input";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterClothingTypeComponent } from './filter-clothing-type/filter-clothing-type.component';
import { FilterTargetAudienceComponent } from './filter-target-audience/filter-target-audience.component';
import { LoginComponent } from './login/login.component';
import {CustomerInterceptorInterceptor} from "./interceptor/customer-interceptor.interceptor";
import { LatestProductComponent } from './latest-product/latest-product.component';
import { ProductInformationComponent } from './product-information/product-information.component';
import {NgOptimizedImage} from "@angular/common";
import { ItemAddedToShoppingCartComponent } from './item-added-to-shopping-cart/item-added-to-shopping-cart.component';
import { BoughtItemsComponent } from './bought-items/bought-items.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ShoppingCartComponent,
    ExtraComponent,
    LikedComponent,
    ProductComponent,
    PageNotFoundComponent,
    PopUpUpdateProductComponent,
    FilterClothingTypeComponent,
    FilterTargetAudienceComponent,
    LoginComponent,
    LatestProductComponent,
    ProductInformationComponent,
    ItemAddedToShoppingCartComponent,
    BoughtItemsComponent
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
