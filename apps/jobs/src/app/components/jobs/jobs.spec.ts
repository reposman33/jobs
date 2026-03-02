import { ComponentFixture, TestBed } from '@angular/core/testing';
import { jobs } from './jobs';

describe('jobs', () => {
  let component: jobs;
  let fixture: ComponentFixture<jobs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [jobs],
    }).compileComponents();

    fixture = TestBed.createComponent(jobs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
