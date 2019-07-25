import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillReceivesComponent } from './bill-receives.component';

describe('BillReceivesComponent', () => {
  let component: BillReceivesComponent;
  let fixture: ComponentFixture<BillReceivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillReceivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillReceivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
