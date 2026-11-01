import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarCategory } from './avatar-category';
import { inputBinding, signal, WritableSignal } from '@angular/core';
import { Category } from '../../habits/habit.model';

describe('AvatarCategory', () => {
  let component: AvatarCategory;
  let fixture: ComponentFixture<AvatarCategory>;
  let category: WritableSignal<Category>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarCategory],
    }).compileComponents();

    category = signal('study');

    fixture = TestBed.createComponent(AvatarCategory, {
      bindings: [inputBinding('category', category)],
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it.each([
    { testCategory: 'study' as Category, expected: 'S' },
    { testCategory: 'health' as Category, expected: 'H' },
  ])('displays $expected when the category is ${category}', ({ testCategory, expected }) => {
    category.set(testCategory);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;

    expect(el.textContent.trim()).toBe(expected);
  });
});
