import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodayPage } from './today-page';
import { HabitService } from '../../habits/service/habit';
import { type Habit } from '../../habits/habit.model';
import { signal, WritableSignal } from '@angular/core';

const mockHabits: Habit[] = [
  {
    id: 'id1',
    name: 'coding training',
    category: 'study',
    reminder: '07:30',
    scheduledDays: [0, 2, 4],
  },
  {
    id: 'id2',
    name: 'reading 10 pages',
    category: 'reading',
    reminder: '22:30',
    scheduledDays: [5, 6],
  },
  {
    id: 'id3',
    name: "cleaning cat's stuff",
    category: 'cats',
    reminder: '08:00',
    scheduledDays: [0, 1, 2, 3, 4, 5, 6],
  },
];

describe('TodayPage', () => {
  let component: TodayPage;
  let fixture: ComponentFixture<TodayPage>;
  let habitService: HabitService;
  let mockHabitsSignal: WritableSignal<readonly Habit[]>;
  let mockHabitService: Partial<HabitService>;

  beforeEach(async () => {
    mockHabitsSignal = signal<readonly Habit[]>(mockHabits);

    mockHabitService = {
      habits: mockHabitsSignal.asReadonly(),
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
      ],
    }).compileComponents();

    habitService = TestBed.inject(HabitService);
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

    const emptyMessageP = el.querySelector('p');

    expect(emptyMessageP?.textContent.trim()).toBe('No habits for today');
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

    await vi.advanceTimersByTimeAsync(60_000);

    fixture.detectChanges();

    expect(el.textContent).toContain(mockHabitsSignal()[0].name);
    expect(el.textContent).toContain(mockHabitsSignal()[2].name);
    expect(el.textContent).not.toContain(mockHabitsSignal()[1].name);
  });
});
