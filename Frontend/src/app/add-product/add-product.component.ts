import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ProductsService } from "./../products.service";
import { Product } from "../Product";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"],
})
export class AddProductComponent implements OnInit {
  constructor(
    private router: Router,
    private productservice: ProductsService
  ) {}

  //Function for adding product details to DB
  addProduct(form) {
    let newProduct: Product = {
      productName: form.value.productName,
      productPrice: form.value.productPrice,
      productDescription: form.value.productDescription,
    };
    this.productservice.addProductDetails(newProduct).subscribe((item) => {
      console.log(item);
    });
    setTimeout(() => {
      this.router.navigate(["/home"]);
    }, 400);
  }
  ngOnInit() {}
}
