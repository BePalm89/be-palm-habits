import { TestBed } from '@angular/core/testing';
import { HabitService } from './habit';

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
});
