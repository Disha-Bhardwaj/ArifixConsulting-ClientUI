import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  addAppointForm!: FormGroup;
  offerTimeForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private toastr: ToastrService,
    private fb: FormBuilder, public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data1: any, public translateService: TranslateService) { }

  ngOnInit(): void {
    this.formInitialize();
    this.addAppointForm.reset();
  }
  @ViewChild('startTimeNGX') startTimeNGX: any;
  showAddAppStart = false
 
  formInitialize() {
    this.addAppointForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      serviceName: ['', [Validators.required]],
      employeeName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      startTime: ['', [Validators.required,]],
      finishTime: ['', [Validators.required,]],
      date: ['', [Validators.required,]],
    })
    this.offerTimeForm = this.fb.group({
      startTime: ['', [Validators.required,]],
      startDate: ['', [Validators.required,]],
      finishTime: ['', [Validators.required,]],
      finishDate: ['', [Validators.required,]],
    })
  }
  // validation
  get name() {
    return this.addAppointForm.get('name')!;
  }
  get serviceName() {
    return this.addAppointForm.get('serviceName')!;
  }
  get employeeName() {
    return this.addAppointForm.get('employeeName')!;
  }
  get startTime() {
    return this.addAppointForm.get('startTime')!;
  }
  get finishTime() {
    return this.addAppointForm.get('finishTime')!;
  }
  get date() {
    return this.addAppointForm.get('date')!;
  }

  sendNewOfferTime() {
    if (this.offerTimeForm.valid) {
      if ((this.offerTimeForm.value.startDate < this.offerTimeForm.value.finishDate )|| (+this.offerTimeForm.value.startDate === +this.offerTimeForm.value.finishDate)) {
        if(this.offerTimeForm.value.startTime < this.offerTimeForm.value.finishTime){
          this.toastr.success(this.translateService.instant("ToastMessages.OfferTime"), '', {
            timeOut: 3000,
          });
          this.dialogRef.close();
        }
        else{
          this.toastr.error(this.translateService.instant("ToastMessages.TimeError"), this.translateService.instant("ToastMessages.Error"), {
            timeOut: 3000,
          });
        }
      } else {
        this.toastr.error(this.translateService.instant("ToastMessages.DateError"), this.translateService.instant("ToastMessages.Error"), {
          timeOut: 3000,
        });
      }
    } else {
      this.toastr.error(this.translateService.instant("ToastMessages.OfferError"), this.translateService.instant("ToastMessages.Error"), {
        timeOut: 3000,
      });
    }

  }
  saveAppointment() {
    if (this.addAppointForm.valid) {
      if (this.addAppointForm.value.startTime < this.addAppointForm.value.finishTime) {
        this.toastr.success(this.translateService.instant("ToastMessages.Appointment"), '', {
          timeOut: 3000,
        });
        this.dialogRef.close();
      } else {
        this.toastr.error(this.translateService.instant("ToastMessages.TimeError"), this.translateService.instant("ToastMessages.Error"), {
          timeOut: 3000,
        });
      }
    }else{
      this.toastr.error(this.translateService.instant("ToastMessages.FillAll"), this.translateService.instant("ToastMessages.Error"), {
        timeOut: 3000,
      });
    }
  }
  cancelAppointment(){
    this.dialogRef.close();
    this.addAppointForm.reset()
  }
  deleteItem(value:any){
    if(value=='delete'){
      this.toastr.success(this.translateService.instant("ToastMessages.Delete"), '', {
        timeOut: 3000,
      });
    }
    this.dialogRef.close();
  }
}

export interface DialogData {
  fromPage: 'salonPage' | 'calendar' | 'addAppointment' | 'companyInfo' | 'booking' | 'notification' | 'BookOfferTime' | 'Pos1' | 'Pos2' | 'Pos3' | 'Pos4' | 'Pos5' | 'Pos6' | 'Pos7' | 'Staff1' | 'Staff2' | 'Staff3' | 'Staff4';
}
