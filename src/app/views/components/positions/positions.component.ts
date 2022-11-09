import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent implements OnInit {

  addPosition = false
  showStep = ''
  permissionForm!: FormGroup;
  servicesForm!: FormGroup;
  openingTimeForm!: FormGroup;
  employeeTypeForm!: FormGroup;
  categoryCount = 0
  showWizard = false
  jobTitle = ''
  disableTitle = false
  serviceCount = 0

  constructor(public dialog: MatDialog, private toastr: ToastrService, private fb: FormBuilder,
    private cookies: CookieService, private route: Router) { }

  ngOnInit(): void {
    this.formInitialize()
    if (this.cookies.get('wizardStart') == 'true') {
      this.showWizard = true
    }
    this.categoryCount = 0
  }
  // cancel changes
  cancelChanges(value: any) {
    if (value == 'closeAll') {
      this.addPosition = false
      this.showStep = ''
      this.jobTitle = ''
      this.openingTimeForm.reset()
      this.permissionForm.reset()
      this.servicesForm.reset()
    }
    else if (value == 'resetTime') {
      this.openingTimeForm.reset()
    }
    else if (value == 'resetPermission') {
      this.permissionForm.reset()
    }
    else if (value == 'resetEmployee') {
      this.employeeTypeForm.reset({
        employeeType: ''
      })
    }
    else if (value == 'resetService') {
      this.servicesForm.reset()
    }

  }
  addPositionBTN() {
    this.addPosition = true
  }
  editTitle() {
    this.disableTitle = false
  }
  showStepsFun(showValue: any) {
    // go to schedule
    if (showValue == 'schedule') {

      if (this.jobTitle.length > 0) {
        this.showStep = showValue
        this.disableTitle = true
      } else {
        this.toastr.error('Please enter the job title', 'Error', {
          timeOut: 3000
        });
      }
      // this.showStep = showValue
    }
    // go to permissions
    else if (showValue == 'permission') {
      if (this.openingTimeForm.valid) {
        if (this.openingTimeForm.value.monClose < this.openingTimeForm.value.monOpen
          || this.openingTimeForm.value.tuesClose < this.openingTimeForm.value.tuesOpen
          || this.openingTimeForm.value.wedClose < this.openingTimeForm.value.wedOpen
          || this.openingTimeForm.value.thursClose < this.openingTimeForm.value.thursOpen
          || this.openingTimeForm.value.friClose < this.openingTimeForm.value.friOpen
          || this.openingTimeForm.value.satClose < this.openingTimeForm.value.satOpen
          || this.openingTimeForm.value.sunClose < this.openingTimeForm.value.sunOpen) {
          this.toastr.error('Closing timings should be greater then Opening timings', 'Error', {
            timeOut: 3000
          });
        } else {
          this.toastr.success('Opening timings has been saved', '', {
            timeOut: 3000,
          });
          this.showStep = showValue
        }

      } else {
        this.toastr.error('Please fill the schedule timings', 'Error', {
          timeOut: 3000
        });
      }
      // this.showStep = showValue
    }
    // go to employee type
    else if (showValue == 'employee type') {
      this.showStep = showValue
    }
    // go to services
    else if (showValue == 'service') {
      this.showStep = showValue
    }
  }
  
  formInitialize() {
    // permission form
    this.permissionForm = this.fb.group({
      permissions: this.fb.array([this.fb.control('')])
    })
    // employee type form
    this.employeeTypeForm = this.fb.group({
      employeeType: ['']
    })
    // services form
    this.servicesForm = this.fb.group({
      categories: this.fb.array([this.fb.group({
        category: '',
        serviceList: this.fb.array([])
      })]),
    })
    // opening time form 

    this.openingTimeForm = this.fb.group({
      monOpen: [''],
      monClose: [''],
      tuesOpen: [''],
      tuesClose: [''],
      wedOpen: [''],
      wedClose: [''],
      thursOpen: [''],
      thursClose: [''],
      friOpen: [''],
      friClose: [''],
      satOpen: [''],
      satClose: [''],
      sunOpen: [''],
      sunClose: [''],
    })
  }

  // removeJobTitle(){
  //   this.jobTitle = ''
  // }
  // services form
  categories(): FormArray {
    return this.servicesForm.get("categories") as FormArray
  }
  addCategory() {
    // if(this.categoryCount == this.serviceCount){
    this.categoryCount++
    console.log('categp', this.categoryCount)
    this.categories().push(this.fb.group({
      category: '',
      serviceList: this.fb.array([])
    }));
    // }else{
    //   this.toastr.error('Please add service', 'Error', {
    //     timeOut: 3000,
    //   });
    // }
  }
  categoryServiceList(empIndex: number): FormArray {
    return this.categories().at(empIndex).get("serviceList") as FormArray
  }
  addService() {
    // this.serviceCount++
    console.log('sercieaadd', this.serviceCount)
    this.categoryServiceList(this.categoryCount).push(this.fb.group({
      service: '',
      time: '',
      price: ['']
    }));
  }

  // permissions form
  addNewPermission() {
    const add = this.permissionForm.get('permissions') as FormArray;
    add.push(this.fb.group({
      permission: ['',[Validators.required]]
    }))
  }
  get getpermission() {
    return this.permissionForm.controls['permissions'] as FormArray
  }
 
  // wizard
  nextWizard() {
    this.route.navigateByUrl('/staff')
  }
  finishWizard() {
    this.cookies.set('wizardStart', 'false')
    this.showWizard = false
  }
  // open dialog
  openDialog(value: any) {
    this.dialog.open(DialogComponent, {
      data: {
        fromPage: value,
      },
    });
  }
  // save info
  detailsSaved() {
    this.toastr.success('Details are saved successfully', '', {
      timeOut: 3000,
    });
    this.addPosition = false
    this.showStep = ''
    this.jobTitle = ''
    this.openingTimeForm.reset()
    this.disableTitle = false;
    this.ngOnInit()
  }
}