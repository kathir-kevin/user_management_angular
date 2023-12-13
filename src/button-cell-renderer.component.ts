import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { ProductsModel } from "./app/components/dashboard/dashboard.model";
import { ApiService } from "./app/services/api.service";
import { AuthService } from "./app/services/auth.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpClient } from "@angular/common/http";
import { ProductModalComponent } from "./app/components/product-modal/product-modal.component";
import { MatDialog } from "@angular/material/dialog";


@Component({
  selector: 'btn-cell-renderer',
  template: `
  <div style="display:flex;align-items:center;justify-content:center;margin-top:6px">
  <a   style="font-size:12px;padding:8px;" class="btn btn-info" (click)="onEdit($event)" (click)="openDialog()">Edit</a>
                    
  <a   style="font-size:12px;padding:8px;" class="btn btn-danger mx-3" (click)="deleteProductsDetail($event)"(click)="RemoveImage($event)">Delete</a> 
  </div>`,
  styleUrls: ['./button.css']
})
export class BtnCellRenderer implements ICellRendererAngularComp, OnInit {

  refresh(params: ICellRendererParams<any, any>): boolean {
    throw new Error("Method not implemented.");
  }

  row: any;
  params: any;
  @Input() receive !: string;
  @Input() mobileSpecification !: any;
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private api: ApiService, private auth: AuthService, private modalService: NgbModal, private http: HttpClient,) { }

  agInit(params: any): void {
    this.params = params;
  }
  ngOnInit(): void {


  }

  onEdit(row: any) {
    var modalData = this.params.data;

    console.log(this.params.data.tokenNo);
    this.auth.storeModalData(modalData);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '1000PX', height: 'auto'
    });
  }
  deleteProductsDetail(row: any) {
    let clickedYes = confirm("Are you sure want to delete");
    if (clickedYes) {
      this.auth.DeleteProduct(this.params.data.tokenNo)
        .subscribe(res => {
          alert("Deleted Successfully");

        })
    }

  }
  RemoveImage(code: any) {
    console.log("remove");
      this.auth.RemoveImage(this.params.data.tokenNo).subscribe(res => {
        alert("Deleted Successfully");
      })
      window.location.reload();
    }
  }
