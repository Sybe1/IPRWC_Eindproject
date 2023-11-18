import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from "@angular/forms";
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ExtraComponent } from './extra/extra.component';
import { LikedComponent } from './liked/liked.component';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatDialogModule} from "@angular/material/dialog";
import { PopUpUpdateProductComponent } from './pop-up-update-product/pop-up-update-product.component';


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
    PopUpUpdateProductComponent
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
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
