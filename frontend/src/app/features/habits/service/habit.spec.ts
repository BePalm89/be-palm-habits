import { TestBed } from '@angular/core/testing';
import { HabitService } from './habit';
import { EVERY_DAY, Habit } from '../habit.model';

describe('HabitService', () => {
  let service: HabitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should remove only the habit with the given id when calling delete', () => {
    service.delete('id1');

    const ids = service.habits().map((habit) => habit.id);

    expect(ids).toEqual(['id2', 'id3']);
  });

  it('should leave the habits unchanged when deleting an id that does not exist', () => {
    const habitsBefore = service.habits();

    service.delete('unknown-id');

    expect(service.habits()).toEqual(habitsBefore);
  });

  it('should add a new habit when add method is called', () => {
    const newHabit: Pick<Habit, 'name' | 'category'> = {
      name: '    Catalano   ',
      category: 'study',
    };

    service.add(newHabit);

    expect(service.habits().length).toBe(4);
    expect(service.habits()[3].name).toBe('Catalano');
    expect(service.habits()[3].scheduledDays).toEqual(EVERY_DAY);
    expect(service.habits()[3].reminder).toBe(null);
  });
});
