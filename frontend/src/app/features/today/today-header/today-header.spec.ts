import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodayHeader } from './today-header';

describe('TodayHeader', () => {
  let component: TodayHeader;
  let fixture: ComponentFixture<TodayHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(TodayHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
