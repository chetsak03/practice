import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from "@angular/core/testing";
import { from } from "rxjs";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { ProductsService } from "../products.service";
import { AddProductComponent } from "./add-product.component";

class RouterStubs {
  navigate(params) {}
}
class ProductServiceStub {
  addProductDetails(prod) {
    return from([]);
  }
}

describe("AddProductComponent", () => {
  let component: AddProductComponent;
  let service: any;
  let fixture: ComponentFixture<AddProductComponent>;
  let form = {
    value: {
      productName: "ProductOne",
      productPrice: 1234,
      productDescription: "this is the description",
    },
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [AddProductComponent],
      providers: [
        { provide: Router, useClass: RouterStubs },
        { provide: ProductsService, useClass: ProductServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ProductsService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call the server to save changes when a new product is added", () => {
    //ARRANGE
    let spyMethod = spyOn(service, "addProductDetails").and.callFake((prod) => {
      // console.log("from addproductdetils" + JSON.stringify(prod));
      return from([]);
    });

    //ACT
    component.addProduct(form);

    //ASSERT
    expect(spyMethod).toHaveBeenCalled();
  });

  it("should redirect route to home after saving product", fakeAsync(() => {
    //ARRANGE
    let router = TestBed.get(Router);
    let spy = spyOn(router, "navigate");
    fixture.detectChanges();

    //ACT
    component.addProduct(form);
    tick(500);

    //ASSERT
    expect(router.navigate).toHaveBeenCalledWith(["/home"]);
  }));
});
