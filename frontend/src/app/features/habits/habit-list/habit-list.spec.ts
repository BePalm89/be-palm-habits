import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HabitList } from './habit-list';

describe('HabitList', () => {
  let component: HabitList;
  let fixture: ComponentFixture<HabitList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitList],
    }).compileComponents();

    fixture = TestBed.createComponent(HabitList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an unordered list with three list items when habits has three items', () => {
    const el = fixture.nativeElement as HTMLElement;
    const numberOfLi = el.querySelectorAll('li').length;

    expect(numberOfLi).toBe(3);
  });

  it('should delete the right item when clicking on the delete button', async () => {
    const el = fixture.nativeElement as HTMLElement;
    const firstDeleteButton = el.querySelector('button');

    firstDeleteButton?.click();
    await fixture.whenStable();

    const numberOfLi = el.querySelectorAll('li').length;

    expect(numberOfLi).toBe(2);
    expect(el.textContent).not.toContain('coding training');
  });
});
