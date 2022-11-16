import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatepickerOptions } from 'ng2-datepicker';
declare var $: any;

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialog: MatDialog, private toastr: ToastrService,
    private cookies: CookieService, private route: Router) { }

  @ViewChild('showBFCalendar',  { read: ElementRef })
  private showBFCalendar!: ElementRef

  showStep = ''
  details = false
  editDetails = false
  showWizard = false
  infoForm!: FormGroup;
  detailsForm!: FormGroup;
  breakFromDate: any
  BFoptions: DatepickerOptions = {};
  breakToDate: any
  BToptions: DatepickerOptions = {};

  toggleCalender() {
    console.log(this.showBFCalendar.nativeElement)
  //   const datePick = this.showBFCalendar.nativeElement.focus();
  //   $(".PosDate").focus();
  //   $("input").focusin(() => {
  //     $(this).select();
  // });
  $('.datepicker-container > calendar-container').css('left','0px !important')
  }
  adjustWidth(value:any){
    $('#PosSelect').css('width', value.length*10 + 20+'px')
  }
  ngOnInit(): void {
    if (this.cookies.get('wizardStart') == 'true') {
      this.showWizard = true
    }
    this.formInitialization();
    this.disableForm()
    this.BFoptions = {
      placeholder: 'Break From',
      format: 'dd/MM/yyyy',
      position: 'right',
      inputClass: 'PosDate',
    };
    this.BToptions = {
      placeholder: 'Break To',
      format: 'dd/MM/yyyy',
      position: 'right',
      inputClass: 'PosDate',
    };
  }
  formInitialization() {
    this.infoForm = this.fb.group({
      employeeEmail: ['', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(60), Validators.pattern('^[a-z0-9A-Z._%+-]+@[a-z0-9A-Z.-]+\\.[a-z]{2,4}$')]],
    })
    this.detailsForm = this.fb.group({
      position: [''],
      addToCalendar: [false],
      breakFrom: [''],
      breakTo: [''],
      employeeDetail: [''],
    })
  }
  disableForm() {
    for (const control of Object.keys(this.detailsForm.controls)) {
      this.detailsForm.controls[control].disable()
    }
  }
  enableForm() {
    for (const control of Object.keys(this.detailsForm.controls)) {
      this.detailsForm.controls[control].enable()
    }
  }
  // validation functions
  get employeeEmail() {
    return this.infoForm.get('employeeEmail')!;
  }
  finishWizard(value: any) {
    this.cookies.set('wizardStart', 'false')
    this.showWizard = false
    if (value == 'finish') {
      this.toastr.success('You have successfully setup wizard', '', {
        timeOut: 3000
      });
      this.route.navigateByUrl('/dashboard')
    }
  }
  showStepsFunction(value: any) {
    if (value == 'One') {
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
  close() {
    this.showStep = '';
    this.infoForm.reset();
    this.detailsForm.reset({
      position: '',
      breakFrom: '',
      breakTo: '',
      employeeDetail: '',
    });
    this.disableForm()
    this.details = false
  }
  showDetails() {
    this.details = !this.details
  }
  editDetailsFun(value: any) {
    this.editDetails = value
    if (value) {
      this.enableForm()
    } else {
      this.disableForm()
      this.detailsForm.reset({
        position: '',
        breakFrom: '',
        breakTo: '',
        employeeDetail: '',
      });
    }
  }
  detailsSaved() {
    if (this.detailsForm.value.breakFrom > this.detailsForm.value.breakTo) {
      this.toastr.error('Break from date cannot be greater than Break to date', 'Error', {
        timeOut: 3000,
      });
    } else {
      this.toastr.success('Details are saved successfully', '', {
        timeOut: 3000,
      });
      this.editDetails = false;
      this.details = false
      this.infoForm.reset()
      this.disableForm()
      this.detailsForm.reset({
        position: '',
        breakFrom: '',
        breakTo: '',
        employeeDetail: '',
      });
    }

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
