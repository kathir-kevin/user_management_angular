import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-job-data',
  templateUrl: './job-data.component.html',
  styleUrls: ['./job-data.component.css']
})
export class JobDataComponent implements OnInit {
  public isValidEmail!: boolean;
  InputData: any;
  usrTenantId: any;
  role: any;
  JobDataForm!: FormGroup;
  usrId:any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private userStore: UserStoreService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.usrTenantId = localStorage.getItem('TenantId');
    this.usrId = localStorage.getItem('UserId');
    this.auth.getLabelDetails(this.usrTenantId).subscribe((res) => {
      console.log(res);
      this.InputData = res.input;
      console.log(this.InputData);
      this.createFormControls();
    });

    this.userStore.getRoleFromStore().subscribe((val) => {
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }

  createFormControls(): void {
    const formControls: { [key: string]: any } = {};

    for (let i = 1; i <= 10; i++) {
      const inputKey = `input${i}`;
      const labelKey = `label${i}`;

      if (this.InputData[inputKey]) {
        formControls[`data${i}`] = new FormControl('', Validators.required);
      } else {
        formControls[`data${i}`] = new FormControl('');
      }
    }

    this.JobDataForm = this.fb.group({
      usrTenantId: [this.usrTenantId, Validators.required],
      usrId: [this.usrId, Validators.required],
      ...formControls
    });
  }

  onSave(): void {
    if (this.JobDataForm.valid) {
      console.log(this.JobDataForm.value, 'heloo');
      // send the data to the database
      this.auth.PostData(this.JobDataForm.value)
        .subscribe({
          next:(res=>{
            alert(res.message);
            this.JobDataForm.reset();
            this.router.navigate(['dashboard'])
          }),
          error:(err=>{
            alert(err?.error.message)
          })
        })
    } else {
      // throw an error using toaster and with required details
      this.validateAllFormFields(this.JobDataForm);
      alert('Your form is invalid');
    }
  }

  private validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  checkValidEmail(event: string): boolean {
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }
}
