import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

import { ProductsService } from "./products.service";
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";

describe("ProductsService", () => {
  let productService: ProductsService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService],
      imports: [HttpClientTestingModule],
    });

    productService = TestBed.get(ProductsService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it("should be created", () => {
    const service: ProductsService = TestBed.get(ProductsService);
    expect(service).toBeTruthy();
  });

  it("should retrieve all products", () => {
    productService.getProductDetails().subscribe((product) => {
      expect(product).toBeTruthy("No courses returned");
    });

    const req = httpTestingController.expectOne(
      "http://localhost:3000/api/GlobantProducts/getallProducts"
    );
    expect(req.request.method).toEqual("GET");
    req.flush({
      payload: [
        {
          _id: "5fe7461acd60fa08281f49b5",
          productName: "ProductOne",
          productPrice: 34980,
          productDescription: "THis is the description of product one",
          __v: 0,
        },
        {
          _id: "5fe98ff66678ea1ed00537c1",
          productName: "ProductTwo",
          productPrice: 134234,
          productDescription: "This is the description of product Two",
          __v: 0,
        },
      ],
    });
  });

  it("should save product details", () => {
    productService
      .addProductDetails({
        productName: "ProductTwo",
        productPrice: 134234,
        productDescription: "This is the description of product Two",
      })
      .subscribe((res) => {
        expect(res).toBeTruthy();
      });
    const req = httpTestingController.expectOne(
      "http://localhost:3000/api/GlobantProducts/addProduct"
    );
    expect(req.request.method).toEqual("POST");
    req.flush({
      productName: "ProductTwo",
      productPrice: 134234,
      productDescription: "This is the description of product Two",
    });
  });

  it("should delete the product using id ", () => {
    productService.deleteProduct(12).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      "http://localhost:3000/api/GlobantProducts/deleteProduct/" + 12
    );

    expect(req.request.method).toEqual("DELETE");

    req.flush(12);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
