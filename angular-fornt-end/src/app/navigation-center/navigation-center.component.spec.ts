import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationCenterComponent } from './navigation-center.component';

describe('NavigationCenterComponent', () => {
  let component: NavigationCenterComponent;
  let fixture: ComponentFixture<NavigationCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
