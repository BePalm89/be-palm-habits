import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoachPage } from './coach-page';

describe('CoachPage', () => {
  let component: CoachPage;
  let fixture: ComponentFixture<CoachPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CoachPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
