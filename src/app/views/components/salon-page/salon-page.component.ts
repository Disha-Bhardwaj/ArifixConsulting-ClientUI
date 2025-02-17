import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;
@Component({
  selector: 'app-salon-page',
  templateUrl: './salon-page.component.html',
  styleUrls: ['./salon-page.component.scss']
})
export class SalonPageComponent implements OnInit {

  constructor(public dialog: MatDialog, private fb: FormBuilder, private toastr: ToastrService,
    private cookies: CookieService, private route: Router, public translateService: TranslateService) { }

  salonDetailForm!: FormGroup;
  openingTimeForm!: FormGroup;
  showEditSalonBtn = false
  showEditOpenTimeBtn = false
  showWizard = false
  imageUrl: any;
  fileToUpload: any;

  ngOnInit(): void {
    this.formInitialize();
    if (this.cookies.get('wizardStart') == 'true') {
      this.showWizard = true
    }
    this.disableForm('salon')
    this.disableForm('opentime')
    $('#selectDrop').css('background-color','#ffffff !important')
  }
  nextWizard() {
    this.route.navigateByUrl('/positions')
  }
  finishWizard() {
    this.cookies.set('wizardStart', 'false')
    this.showWizard = false
  }
  uploadImg(file: any) {
    this.fileToUpload = file.target.files.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  formInitialize() {
    this.salonDetailForm = this.fb.group({
      address: ['', [Validators.required, Validators.maxLength(300)]],
      city: ['', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z]+$')]],
      country: ['', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z]+$')]],
      zipCode: ['', [Validators.required, Validators.maxLength(15), Validators.pattern('^[0-9]+$')]],
      currency: ['', [Validators.required]],
      phoneNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      salonName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    })
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
  editSalonDetail(value: any) {
    if (value == 'edit') {
      this.showEditSalonBtn = true
      this.enableForm('salon')
    } else {
      this.showEditSalonBtn = false
      this.disableForm('salon')
      this.salonDetailForm.reset({
        currency: ''
      })
    }

  }
  editOpenTime(value: any) {
    if (value == 'edit') {
      this.showEditOpenTimeBtn = true
      this.enableForm('opentime')
    }
    else {
      this.showEditOpenTimeBtn = false
      this.disableForm('opentime')
      this.openingTimeForm.reset()
    }
  }
  enableForm(formValue: any) {
    if (formValue == 'salon') {
      for (const control of Object.keys(this.salonDetailForm.controls)) {
        this.salonDetailForm.controls[control].enable()
      }
    } else {
      for (const control of Object.keys(this.openingTimeForm.controls)) {
        this.openingTimeForm.controls[control].enable()
      }
    }
  }
  disableForm(formValue: any) {
    if (formValue == 'salon') {
      for (const control of Object.keys(this.salonDetailForm.controls)) {
        this.salonDetailForm.controls[control].disable()
      }
    } else {
      for (const control of Object.keys(this.openingTimeForm.controls)) {
        this.openingTimeForm.controls[control].disable()
      }
    }
  }
  saveSalonDetails() {
    if (this.salonDetailForm.valid) {
      this.toastr.success(this.translateService.instant("ToastMessages.SalonSuccess"), '', {
        timeOut: 3000,
      });
      // this.salonDetailForm.reset({
      //   currency: ''
      // })
      this.showEditSalonBtn = false
      this.disableForm('salon')
    } else {
      this.toastr.error(this.translateService.instant("ToastMessages.FillAll"), this.translateService.instant("ToastMessages.Error"), {
        timeOut: 3000
      });
    }
  }
  saveTimings() {
    if (this.openingTimeForm.valid) {
      if (this.openingTimeForm.value.monClose < this.openingTimeForm.value.monOpen
         || this.openingTimeForm.value.tuesClose < this.openingTimeForm.value.tuesOpen
         || this.openingTimeForm.value.wedClose < this.openingTimeForm.value.wedOpen
         || this.openingTimeForm.value.thursClose < this.openingTimeForm.value.thursOpen
         || this.openingTimeForm.value.friClose < this.openingTimeForm.value.friOpen
         || this.openingTimeForm.value.satClose < this.openingTimeForm.value.satOpen
         || this.openingTimeForm.value.sunClose < this.openingTimeForm.value.sunOpen) {
          this.toastr.error(this.translateService.instant("ToastMessages.CloseTime"), this.translateService.instant("ToastMessages.Error"), {
            timeOut: 3000
          });
      }else{
        this.toastr.success(this.translateService.instant("ToastMessages.TimeSaved"), '', {
          timeOut: 3000,
        });
        // this.openingTimeForm.reset()
        this.showEditOpenTimeBtn = false
        this.disableForm('opentime')
      }
    } else {
      this.toastr.error(this.translateService.instant("ToastMessages.FillAll"), this.translateService.instant("ToastMessages.Error"), {
        timeOut: 3000
      });
    }
  }
  // validation
  get address() {
    return this.salonDetailForm.get('address')!;
  }
  get city() {
    return this.salonDetailForm.get('city')!;
  }
  get currency() {
    return this.salonDetailForm.get('currency')!;
  }
  get salonName() {
    return this.salonDetailForm.get('salonName')!;
  }
  get country() {
    return this.salonDetailForm.get('country')!;
  }
  get zipCode() {
    return this.salonDetailForm.get('zipCode')!;
  }
  get phoneNo() {
    return this.salonDetailForm.get('phoneNo')!;
  }
  get monOpen() {
    return this.openingTimeForm.get('monOpen')!;
  }
  get monClose() {
    return this.openingTimeForm.get('monClose')!;
  }
  get tuesOpen() {
    return this.openingTimeForm.get('tuesOpen')!;
  }
  get tuesClose() {
    return this.openingTimeForm.get('tuesClose')!;
  }
  get wedOpen() {
    return this.openingTimeForm.get('wedOpen')!;
  }
  get wedClose() {
    return this.openingTimeForm.get('wedClose')!;
  }
  get thursOpen() {
    return this.openingTimeForm.get('thursOpen')!;
  }
  get thursClose() {
    return this.openingTimeForm.get('thursClose')!;
  }
  get friOpen() {
    return this.openingTimeForm.get('friOpen')!;
  }
  get friClose() {
    return this.openingTimeForm.get('friClose')!;
  }
  get satOpen() {
    return this.openingTimeForm.get('satOpen')!;
  }
  get satClose() {
    return this.openingTimeForm.get('satClose')!;
  }
  get sunOpen() {
    return this.openingTimeForm.get('sunOpen')!;
  }
  get sunClose() {
    return this.openingTimeForm.get('sunClose')!;
  }
  openDialog() {
    // const dialogRef = this.dialog.open(DialogComponent);
    this.dialog.open(DialogComponent, {
      data: {
        fromPage: 'salonPage',
      },
    });
  }

}
