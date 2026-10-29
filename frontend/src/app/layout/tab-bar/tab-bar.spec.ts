import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabBar, TabItem } from './tab-bar';
import { inputBinding, signal } from '@angular/core';
import {
  LucideChartColumn,
  LucideCircleCheck,
  LucideList,
  LucideMessageCircle,
} from '@lucide/angular';
import { provideRouter, Router } from '@angular/router';

const tabs: TabItem[] = [
  {
    path: '',
    label: 'Today',
    exact: true,
    icon: LucideCircleCheck,
  },
  {
    path: 'habits',
    label: 'Habits',
    exact: false,
    icon: LucideList,
  },
  {
    path: 'stats',
    label: 'Stats',
    exact: false,
    icon: LucideChartColumn,
  },
  {
    path: 'coach',
    label: 'Coach',
    exact: false,
    icon: LucideMessageCircle,
  },
];

describe('TabBar', () => {
  let component: TabBar;
  let fixture: ComponentFixture<TabBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabBar],
      providers: [
        provideRouter([
          { path: '', children: [] },
          { path: 'habits', children: [] },
          { path: 'habits/add', children: [] },
          { path: 'stats', children: [] },
          { path: 'coach', children: [] },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TabBar, {
      bindings: [inputBinding('tabs', signal(tabs))],
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct label for the tabs and the number of the tabs should be correct', () => {
    const el = fixture.nativeElement as HTMLElement;

    const labels = el.querySelectorAll('nav ul li a span');

    expect(labels.length).toBe(4);

    expect(Array.from(labels).map((label) => label.textContent.trim())).toEqual(
      tabs.map((tab) => tab.label),
    );
  });

  it('should href attribute be the correct path', () => {
    const el = fixture.nativeElement as HTMLElement;

    const links = el.querySelectorAll('nav ul li a');

    const hrefs = Array.from(links).map((link) => link.getAttribute('href'));

    expect(hrefs).toEqual(tabs.map((tab) => `/${tab.path}`));
  });

  it.each([
    { path: '', expected: '/' },
    { path: 'habits', expected: '/habits' },
    { path: 'habits/add', expected: '/habits' },
    { path: 'stats', expected: '/stats' },
    { path: 'coach', expected: '/coach' },
  ])(
    'should set aria-current="page" on "/$path" only the $expected tab is active',
    async ({ path, expected }) => {
      const router = TestBed.inject(Router);

      await router.navigateByUrl(`/${path}`);
      fixture.detectChanges();

      const links = fixture.nativeElement.querySelectorAll(
        'nav ul li a',
      ) as NodeListOf<HTMLAnchorElement>;

      const activeLink = Array.from(links).find((l) => l.getAttribute('href') === expected);
      const inactiveLinks = Array.from(links).filter((l) => l !== activeLink);

      expect(activeLink?.getAttribute('aria-current')).toBe('page');

      inactiveLinks.forEach((link) => {
        expect(link.getAttribute('aria-current')).toBe(null);
      });
    },
  );
});
