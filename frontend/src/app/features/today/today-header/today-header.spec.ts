import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodayHeader } from './today-header';
import { provideRouter } from '@angular/router';
import { inputBinding, signal, WritableSignal } from '@angular/core';

describe('TodayHeader', () => {
  let component: TodayHeader;
  let fixture: ComponentFixture<TodayHeader>;
  let today: WritableSignal<Date>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayHeader],
      providers: [provideRouter([{ path: 'habits/add', children: [] }])],
    }).compileComponents();

    today = signal(new Date());

    fixture = TestBed.createComponent(TodayHeader, {
      bindings: [inputBinding('today', today)],
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays a link with plus icon to add a new habits and redirect the user to /habits/add', () => {
    const el = fixture.nativeElement as HTMLElement;

    const addHabitLink = el.querySelector('[aria-label="New habit"]');

    expect(addHabitLink?.getAttribute('href')).toBe('/habits/add');
  });

  it('displays a link with plus icon to add that habits with aria label "New habit"', () => {
    const el = fixture.nativeElement as HTMLElement;

    const addHabitLink = el.querySelector('a')!;

    expect(addHabitLink.getAttribute('aria-label')).toBe('New habit');
  });

  it.each([
    { testDate: new Date('2026-10-30'), expected: 'Friday, October 30' },
    { testDate: new Date('2026-11-01'), expected: 'Sunday, November 1' },
  ])('display $expected date format when the date is $today', ({ testDate, expected }) => {
    today.set(testDate);

    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;

    const formattedDate = el.querySelector('header div p')!;

    expect(formattedDate.textContent.trim()).toBe(expected);
  });
});
