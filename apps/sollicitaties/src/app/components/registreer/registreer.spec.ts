import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registreer } from './registreer';

describe('Registreer', () => {
  let component: Registreer;
  let fixture: ComponentFixture<Registreer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registreer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Registreer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
