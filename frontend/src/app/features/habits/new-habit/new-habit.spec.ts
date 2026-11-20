import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewHabit } from './new-habit';
import { provideRouter } from '@angular/router';

describe('NewHabit', () => {
  let component: NewHabit;
  let fixture: ComponentFixture<NewHabit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewHabit],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NewHabit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
