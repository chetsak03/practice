import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Product } from "./Product";
@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProductDetails() {
    return this.http
      .get<any>("http://localhost:3000/api/GlobantProducts/getallProducts")
      .pipe(map((res) => res));
  }

  deleteProduct(id) {
    return this.http
      .delete("http://localhost:3000/api/GlobantProducts/deleteProduct/" + id)
      .pipe(map((res) => res));
  }

  addProductDetails(newProduct) {
    let headers = new HttpHeaders();
    headers.append("content-Type", "application/json");
    return this.http
      .post(
        "http://localhost:3000/api/GlobantProducts/addProduct",
        newProduct,
        {
          headers: headers,
        }
      )
      .pipe(map((res) => res));
  }
}
