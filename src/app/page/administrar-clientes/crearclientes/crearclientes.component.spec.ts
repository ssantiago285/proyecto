import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearclientesComponent } from './/crearclientes.cmponent';

describe('CrearclientesComponent', () => {
  let component: CrearclientesComponent;
  let fixture: ComponentFixture<CrearclientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearclientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
