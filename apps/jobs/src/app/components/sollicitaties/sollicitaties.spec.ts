import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sollicitaties } from './sollicitaties';

describe('Sollicitaties', () => {
  let component: Sollicitaties;
  let fixture: ComponentFixture<Sollicitaties>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sollicitaties],
    }).compileComponents();

    fixture = TestBed.createComponent(Sollicitaties);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
