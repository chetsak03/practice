import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { from, of } from "rxjs";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { Product } from "../Product";
import { ProductsService } from "../products.service";
import { HomeComponent } from "./home.component";

class ProductsServiceStub {
  deleteProduct(id) {
    return of([]);
  }
  getProductDetails() {
    return from([]);
  }
}

describe("HomeComponent", () => {
  let component: HomeComponent;
  let service: any;
  let fixture: ComponentFixture<HomeComponent>;
  let el: DebugElement;
  let ProductsArrays: Product[] = [
    {
      productName: "Prodone",
      productPrice: 234,
      productDescription: "desc",
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: ProductsService, useClass: ProductsServiceStub }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ProductsService);
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set ProductsArray with the products recieved from server", () => {
    //ARRANGE
    spyOn(service, "getProductDetails").and.callFake(() => {
      return from([ProductsArrays]);
    });
    //ACT
    component.getItems();
    //ASSERT
    expect(component.ProductsArray.length).toBeGreaterThan(0);
  });

  it("should display all product cards", () => {
    //ARRNAGE
    spyOn(service, "getProductDetails").and.callFake(() => {
      return from([ProductsArrays]);
    });

    //ACT
    component.getItems();

    fixture.detectChanges();
    const cards = el.queryAll(By.css(".allcards"));

    //ASSERT
    expect(cards).toBeTruthy("Could not found any cards");
    expect(cards.length).toBeGreaterThan(0);
    expect(component.ProductsArray.length).toBeGreaterThan(0);
  });

  it("should call delete on server if user confirms", () => {
    let productObject = {
      _id: "1234",
      productName: "Prodone",
      productPrice: 234,
      productDescription: "desc",
    };

    //ARRANGE
    spyOn(window, "confirm").and.returnValue(true);
    let spy = spyOn(service, "deleteProduct").and.callFake(() => {
      return of([]);
    });

    //ACT
    component.deleteCard(productObject);

    //ASSERT
    expect(spy).toHaveBeenCalledWith(productObject._id);
  });

  it("should Not call delete on server if user cancels", () => {
    //ARRANGE
    spyOn(window, "confirm").and.returnValue(false);
    let spy = spyOn(service, "deleteProduct").and.returnValue(of([]));

    //ACT
    component.deleteCard(1);

    //ASSERT
    expect(spy).not.toHaveBeenCalledWith(1);
  });
});
