import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodaySummary } from './today-summary';
import { inputBinding, signal, WritableSignal } from '@angular/core';

describe('TodaySummary', () => {
  let component: TodaySummary;
  let fixture: ComponentFixture<TodaySummary>;
  let done: WritableSignal<number>;
  let total: WritableSignal<number>;
  let remaining: WritableSignal<string[]>;
  let percentage: WritableSignal<number>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodaySummary],
    }).compileComponents();

    done = signal(0);
    total = signal(3);
    remaining = signal(['Catalan', 'Water', 'Walking with Luca']);
    percentage = signal(0);

    fixture = TestBed.createComponent(TodaySummary, {
      bindings: [
        inputBinding('done', done),
        inputBinding('total', total),
        inputBinding('remaining', remaining),
        inputBinding('percentage', percentage),
      ],
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const cases = [
    {
      name: 'no habits done',
      doneTest: 0,
      totalTest: 3,
      remainingTest: ['Catalan', 'Water', 'Walking with Luca'],
      expected: {
        title: '0 of 3 done',
        left: 'Left: Catalan, Water, Walking with Luca',
      },
    },
    {
      name: 'some habits done',
      doneTest: 2,
      totalTest: 3,
      remainingTest: ['Water'],
      expected: {
        title: '2 of 3 done',
        left: 'Left: Water',
      },
    },
    {
      name: 'all habits done',
      doneTest: 3,
      totalTest: 3,
      remainingTest: [],
      expected: {
        title: '3 of 3 done',
        left: 'All done for today!',
      },
    },
  ];

  it.each(cases)(
    'returns $name when done is $doneTest, total is $totalTest and remaining is $remainingTest',
    async ({ doneTest, totalTest, remainingTest, expected }) => {
      done.set(doneTest);
      total.set(totalTest);
      remaining.set(remainingTest);

      await fixture.whenStable();

      const title = fixture.nativeElement.querySelector('p.title');
      const remainingLabel = fixture.nativeElement.querySelector('p.remaining');

      expect(title.textContent).toBe(expected.title);
      expect(remainingLabel.textContent).toBe(expected.left);
    },
  );

  it('shows the svg with two circle with the correct progress and the correct text in the middle', async () => {
    percentage.set(50);

    await fixture.whenStable();

    const text = fixture.nativeElement.querySelector('text');
    const circle = fixture.nativeElement.querySelectorAll('circle')[1];

    expect(text.textContent).toBe(' 50% ');
    expect(Number(circle.getAttribute('stroke-dashoffset'))).toBeCloseTo(106.8, 1);
  });
});
