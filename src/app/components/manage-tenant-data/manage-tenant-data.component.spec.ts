import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTenantDataComponent } from './manage-tenant-data.component';

describe('ManageTenantDataComponent', () => {
  let component: ManageTenantDataComponent;
  let fixture: ComponentFixture<ManageTenantDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTenantDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTenantDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
