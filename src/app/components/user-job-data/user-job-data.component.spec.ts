import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserJobDataComponent } from './user-job-data.component';

describe('UserJobDataComponent', () => {
  let component: UserJobDataComponent;
  let fixture: ComponentFixture<UserJobDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserJobDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserJobDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
