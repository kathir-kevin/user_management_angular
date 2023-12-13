import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersJobDataComponent } from './users-job-data.component';

describe('UsersJobDataComponent', () => {
  let component: UsersJobDataComponent;
  let fixture: ComponentFixture<UsersJobDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersJobDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersJobDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
