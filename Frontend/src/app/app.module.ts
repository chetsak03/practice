import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { HomeComponent } from "./home/home.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { FooterComponent } from './footer/footer.component';
import { ShopNamesComponent } from './shop-names/shop-names.component';

const appRoutes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "add-products",
    component: AddProductComponent,
  },
  {
    path: "**",
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    AddProductComponent,
    FooterComponent,
    ShopNamesComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
  ],
  exports: [RouterModule],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
