import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAdministrationComponent } from './vendor-administration.component';

describe('VendorAdministrationComponent', () => {
  let component: VendorAdministrationComponent;
  let fixture: ComponentFixture<VendorAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
