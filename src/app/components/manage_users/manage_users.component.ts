import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-manage_users',
  templateUrl: './manage_users.component.html',
  styleUrls: ['./manage_users.component.css']
})
export class ManageUsersComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  UserData: any;
  editForm!: FormGroup;
  userName: any;
  role: any;
  usrTenantId: any;

  constructor(
    private router: Router,
    private api: ApiService,
    private userStore: UserStoreService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.usrTenantId = localStorage.getItem('TenantId') ;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      searching: true,
      lengthChange: false,
      language: {
        searchPlaceholder: 'text tenant'
      }
    };

    this.editForm = this.fb.group({
      usrId: [''],
      usrFullName: [''],
      usrEmail: [''],
      usrPhoneNo: [''],
      usrJobRole: [''],
      ratePerHour: ['']
    });

    this.userStore.getUserNameFromStore().subscribe((val) => {
      let UserNameFromToken = this.auth.getUserNameFromToken();
      this.userName = val || UserNameFromToken;
      console.log(this.userName, 'usrname');
    });

    this.userStore.getRoleFromStore().subscribe((val) => {
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
      console.log(this.role);
    });

    this.auth.GetUserDataByTenantId(this.usrTenantId).subscribe((res) => {
      console.log(res, 'sadaa');
      this.UserData = res.userData;
      console.log(this.UserData);
      this.dtTrigger.next(null);
    });
  }
  

  onAccept(user: any) {
    this.editForm.patchValue({
      usrId: user.usrId,
      usrFullName: user.usrFullName,
      usrEmail: user.usrEmail,
      usrPhoneNo: user.usrPhoneNo,
      usrJobRole: user.usrJobRole,
      ratePerHour: user.ratePerHour
    });
    let clickedYes = confirm('Are you sure want to edit?');
    if (clickedYes) {
    this.auth.UpdateUserData( this.editForm.value)
        .subscribe({
          next:(res=>{
            alert(res.message);
            this.router.navigate(['manageTenantData'])
          }),
          error:(err=>{
            alert(err?.error.message)
          })
        })
      }
  }

  onUserNameEdit(event: any) {
    this.editForm.controls['usrFullName'].setValue(event.target.innerText);
  }

  onUserEmailEdit(event: any) {
    this.editForm.controls['usrEmail'].setValue(event.target.innerText);
  }

  onUserPhoneNoEdit(event: any) {
    this.editForm.controls['usrPhoneNo'].setValue(event.target.innerText);
  }

  onUserRoleEdit(event: any) {
    this.editForm.controls['usrJobRole'].setValue(event.target.innerText);
  }

  onUserRateEdit(event: any) {
    this.editForm.controls['ratePerHour'].setValue(event.target.innerText);
  }

  Reject(user: any) {
    let clickedYes = confirm('Are you sure want to delete');
    if (clickedYes) {
      this.auth.DeleteUser(user.usrId).subscribe((res) => {
        alert('Deleted Successfully');
        this.router.navigate(['manageTenantData']);
      });
    }
  }
}
