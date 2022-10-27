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

  ngOnInit(): void {
    if (this.cookies.get('wizardStart') == 'true') {
      this.showWizard = true
    }
    this.formInitialization();
  }
  formInitialization() {
    this.infoForm = this.fb.group({
      employeeEmail: ['', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(60)]],
    })
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
    console.log(value)
    if (value == 'Two') {
      if (this.infoForm.valid) {
        this.showStep = value
      } else {
        this.toastr.error('Please add employee email', 'Error', {
          timeOut: 3000
        });
      }
    } else {
      this.showStep = value
    }
  }
  showDetails() {
    this.details = true
  }
  editDetailsFun(value: any) {
    this.editDetails = value
  }
  detailsSaved(){
    this.toastr.success('Details are saved successfully', '', {
      timeOut: 3000,
    });
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
