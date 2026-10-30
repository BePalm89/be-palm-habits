import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodayHabitRow } from './today-habit-row';
import { inputBinding, signal } from '@angular/core';

describe('TodayHabitRow', () => {
  let component: TodayHabitRow;
  let fixture: ComponentFixture<TodayHabitRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayHabitRow],
    }).compileComponents();

    fixture = TestBed.createComponent(TodayHabitRow, {
      bindings: [inputBinding('habit', signal([]))],
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
