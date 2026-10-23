import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddHabitForm } from './add-habit-form';
import { ActivatedRoute, provideRouter } from '@angular/router';

describe('AddHabitForm', () => {
  let component: AddHabitForm;
  let fixture: ComponentFixture<AddHabitForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHabitForm],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AddHabitForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
