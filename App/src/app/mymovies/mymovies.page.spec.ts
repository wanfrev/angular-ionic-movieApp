import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MymoviesPage } from './mymovies.page';

describe('MymoviesPage', () => {
  let component: MymoviesPage;
  let fixture: ComponentFixture<MymoviesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MymoviesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
