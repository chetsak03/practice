import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { RouterLinkWithHref } from "@angular/router";

import { NavigationComponent } from "./navigation.component";

describe("NavigationComponent", () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavigationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have link to home", () => {
    //ARRANGE
    let debugElements = fixture.debugElement.queryAll(
      By.directive(RouterLinkWithHref)
    );
    //ACT
    let index = debugElements.findIndex((de) => {
      return de.properties["href"] === "/home";
    });

    //ASSERT
    expect(index).toBeGreaterThan(-1);
  });

  it("should have link to add Products", () => {
    //ARRANGE
    let debugElements = fixture.debugElement.queryAll(
      By.directive(RouterLinkWithHref)
    );
    //ACT
    let index = debugElements.findIndex((de) => {
      return de.properties["href"] === "/add-products";
    });
    //ASSERT
    expect(index).toBeGreaterThan(-1);
  });
});
