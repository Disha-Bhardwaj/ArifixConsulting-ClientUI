import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatepickerOptions } from 'ng2-datepicker';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;
class Structure {
  editDetails?: boolean;
  showDetails?: boolean;
  position?: string;
  addToCalendar?: boolean;
  breakDateFrom?: Date;
  breakDateTo?: Date;
}
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialog: MatDialog, private toastr: ToastrService,
    private cookies: CookieService, private route: Router, public translateService: TranslateService) { }

  showStep = ''
  showWizard = false
  infoForm!: FormGroup;
  arrayItemList: Structure[] = [];
  selectedRemoveIndex:any

  adjustWidth(value: any) {
    $('#PosSelect').css('width', value.length * 10 + 20 + 'px')
  }
  ngOnInit(): void {
    if (this.cookies.get('wizardStart') == 'true') {
      this.showWizard = true
    }
    this.formInitialization();
    $('#PosSelect').css('background-color', '#ffffff !important')
    $('.inputMat').css('color', '#000000 !important;')
  }

  formInitialization() {
    this.infoForm = this.fb.group({
      employeeEmail: ['', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(60), Validators.pattern('^[a-z0-9A-Z._%+-]+@[a-z0-9A-Z.-]+\\.[a-z]{2,4}$')]],
    })
  }

  // validation functions
  get employeeEmail() {
    return this.infoForm.get('employeeEmail')!;
  }

  // finish wizard
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
  // show steps 
  showStepsFunction(value: any) {
    if (value == 'One') {
      this.showStep = value
    }
    else if (value == 'Two') {
      if (this.infoForm.valid) {
        this.arrayItemList.push({
          editDetails: false,
          showDetails: false,
          position: '',
          addToCalendar: false,
        })
        this.infoForm.reset();
        this.showStep = value;
      }
      else {
        this.toastr.error(this.translateService.instant("ToastMessages.ValidEmail"), this.translateService.instant("ToastMessages.Error"), {
          timeOut: 3000
        });
      }
    } else {
      this.showStep = value
    }
  }
  // saved details
  saved(dataItem: any, index: any) {
    if (dataItem.position == '' || dataItem.breakDateFrom == null || dataItem.breakDateTo == null) {
      this.toastr.error(this.translateService.instant("ToastMessages.FillAll"), this.translateService.instant("ToastMessages.Error"), {
        timeOut: 3000,
      });
    }
    else{
      if (dataItem.breakDateFrom > dataItem.breakDateTo) {
        this.toastr.error(this.translateService.instant("ToastMessages.BreakError"), this.translateService.instant("ToastMessages.Error"), {
          timeOut: 3000,
        });
      } else {
        this.toastr.success(this.translateService.instant("ToastMessages.DetailSaved"), '', {
          timeOut: 3000,
        });
        dataItem.editDetails = false;
      }
    }
  }
  // cancel changes
  cancelChanges(dataItem: any, index: any) {
    dataItem.editDetails = false;
    dataItem.showDetails = true;
    dataItem.position = '';
    dataItem.addToCalendar = false;
    dataItem.breakDateFrom = null;
    dataItem.breakDateTo = null;
  }
  // dropdown style change
  changeDropdown(value: any, index: any) {
    if (value.showDetails) {
      $('#matIcon' + index).css('transform', 'rotate(180deg)')
    } else {
      $('#matIcon' + index).css('transform', 'rotate(360deg)')
    }
  }
  // close changes
  closeChanges(index: any) {
    this.selectedRemoveIndex = index
    // this.arrayItemList.splice(index, 1)
  }
  // open dialog box
  openDialog(value: any) {
    this.dialog.open(DialogComponent, {
      data: {
        callback: this.callBack.bind(this),
        fromPage: value,
      },
    });
  }
  // callback
  callBack(value: string) {
    if(value == 'Yes'){
      this.toastr.success(this.translateService.instant("ToastMessages.Delete"), '', {
        timeOut: 3000,
      });
      this.arrayItemList.splice(this.selectedRemoveIndex, 1)
    }
  }
}
