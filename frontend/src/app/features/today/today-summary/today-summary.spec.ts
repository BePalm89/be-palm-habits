import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodaySummary } from './today-summary';

describe('TodaySummary', () => {
  let component: TodaySummary;
  let fixture: ComponentFixture<TodaySummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodaySummary],
    }).compileComponents();

    fixture = TestBed.createComponent(TodaySummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
