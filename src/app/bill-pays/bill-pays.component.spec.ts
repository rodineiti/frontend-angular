import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPaysComponent } from './bill-pays.component';

describe('BillPaysComponent', () => {
  let component: BillPaysComponent;
  let fixture: ComponentFixture<BillPaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillPaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillPaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
