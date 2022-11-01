import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  addAppointForm!: FormGroup;
  offerTimeForm!: FormGroup;
  options: DatepickerOptions = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private toastr: ToastrService, 
  private fb: FormBuilder,public dialogRef: MatDialogRef<DialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data1: any) { }


  ngOnInit(): void {
    this.formInitialize();
    this.options = {
      placeholder: 'dd/mm/yyyy',
      format: 'dd/MM/yyyy',
      position: 'bottom',
      inputClass: 'form-control input formIn',
    };
  }

  formInitialize() {
    this.addAppointForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      startTime: ['', [Validators.required,]],
      finishTime: ['', [Validators.required,]],
      date: ['', [Validators.required,]],
    })
    this.offerTimeForm = this.fb.group({
      startTime: ['', [Validators.required,]],
      finishTime: ['', [Validators.required,]],
    })
  }
  // validation
  get name() {
    return this.addAppointForm.get('name')!;
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
      this.toastr.success('Your offer time sent to the salon', '', {
        timeOut: 3000,
      });
      this.dialogRef.close();
    } else {
      this.toastr.error('Please enter from and to time', 'Error', {
        timeOut: 3000,
      });
    }

  }
  saveAppointment() {
    console.log(this.addAppointForm.value)
    // if (this.addAppointForm.valid) {
    //   this.toastr.success('Your appointment sent to the salon', '', {
    //     timeOut: 3000,
    //   });
    // }
  }
}
export interface DialogData {
  fromPage: 'salonPage' | 'calendar' | 'addAppointment' | 'companyInfo' | 'booking' | 'notification' | 'BookOfferTime' | 'Pos1' | 'Pos2' | 'Pos3' | 'Pos4' | 'Pos5' | 'Pos6' | 'Staff1' | 'Staff2';
}
