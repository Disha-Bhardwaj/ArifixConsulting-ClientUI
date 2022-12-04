import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  addAppointForm!: FormGroup;
  offerTimeForm!: FormGroup;
  // options: DatepickerOptions = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private toastr: ToastrService,
    private fb: FormBuilder, public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data1: any) { }


  ngOnInit(): void {
    this.formInitialize();
    // this.options = {
    //   placeholder: 'dd/mm/yyyy',
    //   format: 'dd/MM/yyyy',
    //   position: 'bottom',
    //   inputClass: 'form-control input formIn',
    // };
    this.addAppointForm.reset();
  }
  @ViewChild('startTimeNGX') startTimeNGX: any;
  // closeTimeField(value:any){
  //   if(value  == 'addAppStart'){
      
  //   }
  // }
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
          this.toastr.success('Offer time sent to the User', '', {
            timeOut: 3000,
          });
          this.dialogRef.close();
        }
        else{
          this.toastr.error('Finishing time should be greater than Starting time', 'Error', {
            timeOut: 3000,
          });
        }
      } else {
        this.toastr.error('Finishing date should be greater than Starting date', 'Error', {
          timeOut: 3000,
        });
      }
    } else {
      this.toastr.error('Please enter from date and time and to date and time', 'Error', {
        timeOut: 3000,
      });
    }

  }
  saveAppointment() {
    if (this.addAppointForm.valid) {
      if (this.addAppointForm.value.startTime < this.addAppointForm.value.finishTime) {
        this.toastr.success('Appointment is saved', '', {
          timeOut: 3000,
        });
        this.dialogRef.close();
      } else {
        this.toastr.error('Finishing time should be greater than Starting time', 'Error', {
          timeOut: 3000,
        });
      }
    }else{
      this.toastr.error('Please fill all the fields', 'Error', {
        timeOut: 3000,
      });
    }
  }
  cancelAppointment(){
    this.dialogRef.close();
    this.addAppointForm.reset()
  }
  deleteItem(){
    this.dialogRef.close();
  }
}

export interface DialogData {
  fromPage: 'salonPage' | 'calendar' | 'addAppointment' | 'companyInfo' | 'booking' | 'notification' | 'BookOfferTime' | 'Pos1' | 'Pos2' | 'Pos3' | 'Pos4' | 'Pos5' | 'Pos6' | 'Pos7' | 'Staff1' | 'Staff2' | 'Staff3' | 'Staff4';
}
