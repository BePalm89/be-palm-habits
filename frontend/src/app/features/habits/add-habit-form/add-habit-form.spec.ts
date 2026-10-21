import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddHabitForm } from './add-habit-form';

describe('AddHabitForm', () => {
  let component: AddHabitForm;
  let fixture: ComponentFixture<AddHabitForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHabitForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AddHabitForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
