import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodayPage } from './today-page';
import { HabitService } from '../../habits/service/habit';
import { type Habit } from '../../habits/habit.model';
import { signal, WritableSignal } from '@angular/core';
import { provideRouter } from '@angular/router';

const mockHabits: Habit[] = [
  {
    id: 'id1',
    name: 'coding training',
    category: 'study',
    reminder: '07:30',
    scheduledDays: [0, 2, 4],
    completedDates: [],
  },
  {
    id: 'id2',
    name: 'reading 10 pages',
    category: 'reading',
    reminder: '22:30',
    scheduledDays: [5, 6],
    completedDates: [],
  },
  {
    id: 'id3',
    name: "cleaning cat's stuff",
    category: 'cats',
    reminder: '08:00',
    scheduledDays: [0, 1, 2, 3, 4, 5, 6],
    completedDates: ['2026-10-28'],
  },
];

describe('TodayPage', () => {
  let component: TodayPage;
  let fixture: ComponentFixture<TodayPage>;
  let mockHabitsSignal: WritableSignal<readonly Habit[]>;
  let mockHabitService: Partial<HabitService>;

  beforeEach(async () => {
    mockHabitsSignal = signal<readonly Habit[]>(mockHabits);

    mockHabitService = {
      habits: mockHabitsSignal.asReadonly(),
      toggleCompletedDate: vi.fn(),
    };

    vi.useFakeTimers({ toFake: ['Date', 'setInterval', 'clearInterval'] });

    vi.setSystemTime(new Date(2026, 9, 29, 23, 59, 30));

    await TestBed.configureTestingModule({
      imports: [TodayPage],
      providers: [
        {
          provide: HabitService,
          useValue: mockHabitService,
        },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodayPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays the "No habits for today" when the list of habits for today is empty', () => {
    const el = fixture.nativeElement as HTMLElement;

    mockHabitsSignal.set([]);

    fixture.detectChanges();

    const numberOfLi = el.querySelectorAll('li').length;

    expect(el.textContent).toContain('No habits for today');
    expect(numberOfLi).toBe(0);
  });

  it('displays the new habits when added a new one', async () => {
    const el = fixture.nativeElement as HTMLElement;
    const numberOfLi = el.querySelectorAll('ul li').length;

    expect(numberOfLi).toBe(1);

    mockHabitsSignal.update((h) => [
      ...h,
      {
        id: 'id4',
        name: 'Catalan',
        category: 'study',
        reminder: '08:00',
        scheduledDays: [0, 1, 2, 3, 4, 5, 6],
        completedDates: [],
      },
    ]);

    await fixture.whenStable();

    const numberOfLiAfterAdd = el.querySelectorAll('ul li').length;

    expect(numberOfLiAfterAdd).toBe(2);
  });

  it('shows the habits of the new day when midnight passes while the page is open', async () => {
    fixture.destroy();

    fixture = TestBed.createComponent(TodayPage);
    component = fixture.componentInstance;

    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;

    expect(el.textContent).toContain(mockHabitsSignal()[2].name);
    expect(el.textContent).not.toContain(mockHabitsSignal()[0].name);
    expect(el.textContent).not.toContain(mockHabitsSignal()[1].name);
    expect(el.textContent).toContain('Thursday, October 29');

    await vi.advanceTimersByTimeAsync(60_000);

    fixture.detectChanges();

    expect(el.textContent).toContain(mockHabitsSignal()[0].name);
    expect(el.textContent).toContain(mockHabitsSignal()[2].name);
    expect(el.textContent).not.toContain(mockHabitsSignal()[1].name);
    expect(el.textContent).toContain('Friday, October 30');
  });

  describe('done today', () => {
    // System time: Thursday 29 October 2026, 23:59:30.
    // "cleaning cat's stuff" (id3) is scheduled every day and was done yesterday (2026-10-28).
    const catsButton = () =>
      [...(fixture.nativeElement as HTMLElement).querySelectorAll('button')].find((b) =>
        b.textContent.includes("cleaning cat's stuff"),
      )!;

    const setCatsCompletedDates = (dates: string[]) =>
      mockHabitsSignal.update((habits) =>
        habits.map((h) => (h.id === 'id3' ? { ...h, completedDates: dates } : h)),
      );

    it('shows a habit done yesterday as not done today', () => {
      expect(catsButton().getAttribute('aria-pressed')).toBe('false');
    });

    it('shows a habit as done when today is in its completed dates', async () => {
      setCatsCompletedDates(['2026-10-28', '2026-10-29']);

      await fixture.whenStable();

      expect(catsButton().getAttribute('aria-pressed')).toBe('true');
    });

    it('asks the service to toggle the clicked habit for today', () => {
      catsButton().click();

      expect(mockHabitService.toggleCompletedDate).toHaveBeenCalledExactlyOnceWith(
        'id3',
        '2026-10-29',
      );
    });

    it('shows the habit as not done again after midnight and toggles the new day', async () => {
      setCatsCompletedDates(['2026-10-29']);
      await fixture.whenStable();
      expect(catsButton().getAttribute('aria-pressed')).toBe('true');

      await vi.advanceTimersByTimeAsync(60_000);
      await fixture.whenStable();

      expect(catsButton().getAttribute('aria-pressed')).toBe('false');

      catsButton().click();

      expect(mockHabitService.toggleCompletedDate).toHaveBeenCalledWith('id3', '2026-10-30');
    });
  });
});
