import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PastWorkoutsPage } from './past-workouts.page';

describe('PastWorkoutsPage', () => {
  let component: PastWorkoutsPage;
  let fixture: ComponentFixture<PastWorkoutsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PastWorkoutsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
