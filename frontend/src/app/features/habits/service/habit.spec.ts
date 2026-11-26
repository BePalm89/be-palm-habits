import { TestBed } from '@angular/core/testing';
import { HabitService } from './habit';
import { EVERY_DAY, HabitDraft } from '../habit.model';

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
    const newHabit: HabitDraft = {
      name: '    Catalano   ',
      category: 'study',
      scheduledDays: [0, 1, 2, 3, 4, 5, 6],
      reminder: null,
    };

    service.add(newHabit);

    expect(service.habits().length).toBe(4);
    expect(service.habits()[3].name).toBe('Catalano');
    expect(service.habits()[3].scheduledDays).toEqual(EVERY_DAY);
    expect(service.habits()[3].reminder).toBe(null);
  });

  it('should update an existing habit when edit method is called', () => {
    const updatedHabit: HabitDraft = {
      name: '    Coding kata   ',
      category: 'reading',
      scheduledDays: [0, 2, 4],
      reminder: '07:00',
    };

    service.edit('id1', updatedHabit);

    const habit = service.habits().find((h) => h.id === 'id1');

    expect(service.habits().length).toBe(3);

    expect(habit?.name).toBe('Coding kata');
    expect(habit?.category).toBe('reading');

    expect(habit?.id).toBe('id1');
    expect(habit?.reminder).toBe('07:00');
    expect(habit?.scheduledDays).toEqual([0, 2, 4]);
  });

  describe('toggleCompletedDate', () => {
    const datesOf = (id: string) => service.habits().find((h) => h.id === id)?.completedDates;

    it('adds the date when the habit was not done that day', () => {
      service.toggleCompletedDate('id1', '2026-11-26');

      expect(datesOf('id1')).toEqual(['2026-11-26']);
    });

    it('removes only that date when the habit was already done that day', () => {
      service.toggleCompletedDate('id1', '2026-11-25');
      service.toggleCompletedDate('id1', '2026-11-26');

      service.toggleCompletedDate('id1', '2026-11-26');

      expect(datesOf('id1')).toEqual(['2026-11-25']);
    });

    it('does not touch the other habits', () => {
      service.toggleCompletedDate('id1', '2026-11-26');

      expect(datesOf('id2')).toEqual([]);
      expect(datesOf('id3')).toEqual([]);
    });

    it('creates a new array instead of changing the old one', () => {
      const before = datesOf('id1');

      service.toggleCompletedDate('id1', '2026-11-26');

      expect(before).toEqual([]);
      expect(datesOf('id1')).not.toBe(before);
    });

    it('keeps the completed dates when the habit is edited', () => {
      service.toggleCompletedDate('id1', '2026-11-26');

      service.edit('id1', {
        name: 'Coding kata',
        category: 'study',
        scheduledDays: [0, 2, 4],
        reminder: null,
      });

      expect(datesOf('id1')).toEqual(['2026-11-26']);
    });
  });
});
