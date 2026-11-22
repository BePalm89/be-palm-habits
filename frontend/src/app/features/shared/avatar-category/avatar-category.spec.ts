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
    { testCategory: 'study', expected: 'S' },
    { testCategory: 'health', expected: 'H' },
  ] satisfies { testCategory: Category; expected: string }[])(
    'displays $expected when the category is $testCategory',
    async ({ testCategory, expected }) => {
      category.set(testCategory);
      await fixture.whenStable();

      const host = fixture.nativeElement as HTMLElement;

      expect(host.textContent.trim()).toBe(expected);
    },
  );

  it.each([
    { testCategory: 'study', expected: 'Category: study' },
    { testCategory: 'cats', expected: 'Category: cats' },
  ] satisfies { testCategory: Category; expected: string }[])(
    'is announced as an image named "$expected" when the category is $testCategory',
    async ({ testCategory, expected }) => {
      category.set(testCategory);
      await fixture.whenStable();

      const host = fixture.nativeElement as HTMLElement;

      expect(host.getAttribute('role')).toBe('img');
      expect(host.getAttribute('aria-label')).toBe(expected);
    },
  );
});
