import { ComponentFixture, TestBed } from '@angular/core/testing';
import { interaccionesComponent } from './interacciones.component';

describe('InteraccionesComponent', () => {
  let component: interaccionesComponent;
  let fixture: ComponentFixture<interaccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [interaccionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(interaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
