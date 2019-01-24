import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KudosAddComponent } from './kudos-add.component';

describe('KudosAddComponent', () => {
  let component: KudosAddComponent;
  let fixture: ComponentFixture<KudosAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KudosAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KudosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
