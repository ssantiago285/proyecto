import { ComponentFixture, TestBed } from '@angular/core/testing';

import { leadsComponent } from './leads.component';

describe('leadsComponent', () => {
  let component: leadsComponent;
  let fixture: ComponentFixture<leadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [leadsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(leadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
