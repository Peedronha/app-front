import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueFormComponent } from './revenue-form.component';

describe('RevenueFormComponent', () => {
  let component: RevenueFormComponent;
  let fixture: ComponentFixture<RevenueFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevenueFormComponent]
    });
    fixture = TestBed.createComponent(RevenueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
