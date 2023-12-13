import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-user-job-data',
  templateUrl: './user-job-data.component.html',
  styleUrls: ['./user-job-data.component.css']
})
export class UserJobDataComponent implements OnInit {


  dtOptions: DataTables.Settings = {};
  public tenants: any = [];
  dtTrigger: Subject<any> = new Subject<any>();
  userName: any;
  role: any;
  usrTenantId: any;
  usrId: any;
  InputData: any;
  WorkData: any;
  editForm1!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private userStore: UserStoreService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      searching: true,
      lengthChange: false,
      destroy: true,
      language: {
        searchPlaceholder: 'text tenant'
      }
    };
    this.editForm1 = this.fb.group({
      usrId: [''],
      usrTenantId: [''],
      data1: [''],
      data2: [''],
      data3: [''],
      data4: [''],
      data5: [''],
      data6: [''],
      data7: [''],
      data8: [''],
      data9: [''],
      data10: [''],
    });
    this.userStore.getUserNameFromStore().subscribe(val => {
      let UserNameFromToken = this.auth.getUserNameFromToken();
      this.userName = val || UserNameFromToken;
      console.log(this.userName, "usrname");
    });
    this.userStore.getRoleFromStore().subscribe(val => {
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
      console.log(this.role);
    });
    this.usrTenantId = localStorage.getItem('TenantId');
    this.usrId = localStorage.getItem('UserId');
    this.auth.getLabelDetails(this.usrTenantId).subscribe((res) => {
      console.log(res);
      this.InputData = res.input;
      console.log(this.InputData);
      this.dtTrigger.next(null);
    });
    this.auth.getUserJobDetails(this.usrId).subscribe((res) => {
      console.log(res);
      this.WorkData = res.jobData1;
      console.log(this.WorkData,"hello");
      this.dtTrigger.next(null);
    });
  }
  onAccept(work: any) {
    this.editForm1.patchValue({
      usrId: work.usrId,
      usrTenantId: work.usrTenantId,
      data1: work.data1,
      data2: work.data2,
      data3: work.data3,
      data4: work.data4,
      data5: work.data5,
      data6: work.data6,
      data7: work.data7,
      data8: work.data8,
      data9: work.data9,
      data10: work.data10
    });
    let clickedYes = confirm('Are you sure want to edit?');
    if (clickedYes) {
      console.log(this.editForm1.value);
      this.auth.UpdateUserJobData(this.editForm1.value)
        .subscribe({
          next: (res => {
            alert(res.message);
            this.router.navigate(['myJobData']);
          }),
          error: (err => {
            alert(err?.error.message);
          })
        });
    }
  }

  onData1Edit(event: any) {
    this.editForm1.controls['data1'].setValue(event.target.innerText);
  }

  onData2Edit(event: any) {
    this.editForm1.controls['data2'].setValue(event.target.innerText);
  }

  onData3Edit(event: any) {
    this.editForm1.controls['data3'].setValue(event.target.innerText);
  }

  onData4Edit(event: any) {
    this.editForm1.controls['data4'].setValue(event.target.innerText);
  }

  onData5Edit(event: any) {
    this.editForm1.controls['data5'].setValue(event.target.innerText);
  }

  onData6Edit(event: any) {
    this.editForm1.controls['data6'].setValue(event.target.innerText);
  }

  onData7Edit(event: any) {
    this.editForm1.controls['data7'].setValue(event.target.innerText);
  }

  onData8Edit(event: any) {
    this.editForm1.controls['data8'].setValue(event.target.innerText);
  }

  onData9Edit(event: any) {
    this.editForm1.controls['data9'].setValue(event.target.innerText);
  }

  onData10Edit(event: any) {
    this.editForm1.controls['data10'].setValue(event.target.innerText);
  }

  Reject(user: any) {
    let clickedYes = confirm('Are you sure want to delete');
    if (clickedYes) {
      this.auth.DeleteUserJobData(user.usrId).subscribe((res) => {
        alert('Deleted Successfully');
        this.router.navigate(['myJobData']);
      });
    }
  }
}
