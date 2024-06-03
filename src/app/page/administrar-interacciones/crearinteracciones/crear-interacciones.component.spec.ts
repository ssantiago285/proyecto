import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearInteraccionesComponent } from './crear-interacciones.component';

describe('CrearinteraccionesComponent', () => {
  let component: CrearInteraccionesComponent;
  let fixture: ComponentFixture<CrearInteraccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearInteraccionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearInteraccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
