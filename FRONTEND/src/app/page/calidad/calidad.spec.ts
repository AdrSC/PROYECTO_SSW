import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Calidad } from './calidad';

describe('Calidad', () => {
  let component: Calidad;
  let fixture: ComponentFixture<Calidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calidad],
    }).compileComponents();

    fixture = TestBed.createComponent(Calidad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
