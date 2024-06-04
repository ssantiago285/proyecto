import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLeadsComponent } from './crear-leads.component';

describe('CrearLeadsComponent', () => {
  let component: CrearLeadsComponent;
  let fixture: ComponentFixture<CrearLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearLeadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
