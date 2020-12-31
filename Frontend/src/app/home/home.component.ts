import { Component, OnInit } from "@angular/core";

import { Product } from "../Product";
import { ProductsService } from "../products.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  ProductsArray: Product[] = [];
  productImageURL = "../../assets/img/unnamed.gif";

  constructor(private productservice: ProductsService) {}

  //Function for Get The Items from DB...
  getItems() {
    this.productservice.getProductDetails().subscribe((items) => {
      this.ProductsArray = items;
    });
  }

  //Function for Deleteing the card...
  deleteCard(product) {
    if (confirm("Are you sure, want to delete " + product.productName + "?")) {
      this.productservice.deleteProduct(product._id).subscribe((data: any) => {
        if (data.n == 1) {
          this.ProductsArray = this.ProductsArray.filter((item) => {
            return product._id !== item._id;
          });
        }
      });
    }
  }
  ngOnInit() {
    this.getItems();
  }
}
