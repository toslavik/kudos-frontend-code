import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KudosEditComponent } from './kudos-edit.component';

describe('KudosEditComponent', () => {
  let component: KudosEditComponent;
  let fixture: ComponentFixture<KudosEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KudosEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KudosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
