import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent implements OnInit {

  addPosition = false
  showStep =''
  permissionForm!: FormGroup;
  arr!: FormArray;
  servicesForm!: FormGroup;
  categoryCount = 0
  constructor(public dialog: MatDialog, private toastr: ToastrService, private fb: FormBuilder) { }

  openDialog(value: any) {
    this.dialog.open(DialogComponent, {
      data: {
        fromPage: value,
      },
    });
  }

  ngOnInit(): void {
    this.permissionForm = this.fb.group({
      permission: this.fb.array([this.fb.control('')])
    })
    this.servicesForm = this.fb.group({
      categories: this.fb.array([this.fb.group({
        category: '',
        serviceList: this.fb.array([])
      })]),
    })
  }
  // services form
  categories(): FormArray {
    return this.servicesForm.get("categories") as FormArray
  }
  addCategory() {
    this.categoryCount++
    this.categories().push(this.fb.group({
      category: '',
      serviceList: this.fb.array([])
    }));
  }
  categoryServiceList(empIndex: number): FormArray {
    return this.categories().at(empIndex).get("serviceList") as FormArray
  }
  // addService(empIndex: number) {
  //   this.categoryServiceList(empIndex).push(this.fb.group({
  //     service: '',
  //     time: '',
  //     price: ''
  //   }));
  // }
   addService() {
    this.categoryServiceList(this.categoryCount).push(this.fb.group({
      service: '',
      time: '',
      price: ''
    }));
  }
  

  // permissions form
  addNewPermission() {
    const add = this.permissionForm.get('permission') as FormArray;
    add.push(this.fb.group({}))
  }
  get permission() {
    return this.permissionForm.controls['permission'] as FormArray
  }



  addPositionBTN() {
    this.addPosition = true
  }
  showStepsFun(showValue: any) {
    this.showStep = showValue
  }
}
