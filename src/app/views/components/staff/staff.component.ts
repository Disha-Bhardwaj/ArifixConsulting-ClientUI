import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialog: MatDialog, private toastr: ToastrService,
    private cookies: CookieService, private route: Router) { }

  showStep = ''
  details = false
  editDetails = false
  showWizard = false
  infoForm!: FormGroup;
  detailsForm!: FormGroup;

  ngOnInit(): void {
    if (this.cookies.get('wizardStart') == 'true') {
      this.showWizard = true
    }
    this.formInitialization();
    this.disableForm()
  }
  formInitialization() {
    this.infoForm = this.fb.group({
      employeeEmail: ['', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(60), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    })
    this.detailsForm = this.fb.group({
      position: [''],
      addToCalendar: [false],
      breakFrom: [''],
      breakTo: [''],
      employeeDetail: [''],
    })
  }
  disableForm(){
    for (const control of Object.keys(this.detailsForm.controls)) {
      this.detailsForm.controls[control].disable()
    }
  }
  enableForm(){
    for (const control of Object.keys(this.detailsForm.controls)) {
      this.detailsForm.controls[control].enable()
    }
  }
  // validation functions
  get employeeEmail() {
    return this.infoForm.get('employeeEmail')!;
  }
  finishWizard() {
    this.cookies.set('wizardStart', 'false')
    this.showWizard = false
  }
  showStepsFunction(value: any) {
    if(value == 'One'){
      this.infoForm.reset();
      this.showStep = value
    }
    else if (value == 'Two') {
      if (this.infoForm.valid) {
        this.showStep = value
      } else {
        this.toastr.error('Please enter valid employee email', 'Error', {
          timeOut: 3000
        });
      }
    } else {
      this.showStep = value
    }
  }
  close(){
    this.showStep = '';
    this.infoForm.reset();
    this.detailsForm.reset();
  }
  showDetails() {
    this.details = true
  }
  editDetailsFun(value: any) {
    this.editDetails = value
    if(value){
      this.enableForm()
    }else{
      this.disableForm()
      this.detailsForm.reset()
    }
  }
  detailsSaved(){
    this.toastr.success('Details are saved successfully', '', {
      timeOut: 3000,
    }); 
    this.editDetails = false;
    this.details = false
    this.infoForm.reset()
    this.disableForm()
  }
  // open dialog box
  openDialog(value: any) {
    this.dialog.open(DialogComponent, {
      data: {
        fromPage: value,
      },
    });
  }

}
