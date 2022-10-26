import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salon-page',
  templateUrl: './salon-page.component.html',
  styleUrls: ['./salon-page.component.scss']
})
export class SalonPageComponent implements OnInit {
  constructor(public dialog: MatDialog, private fb: FormBuilder, private toastr: ToastrService,
    private cookies: CookieService, private route: Router) { }

  salonDetailForm!: FormGroup;
  openingTimeForm!: FormGroup;
  showEditSalonBtn = false
  showEditOpenTimeBtn = false
  showWizard = false
  ngOnInit(): void {
    if (this.cookies.get('wizardStart') == 'true') {
      this.showWizard = true
    }
    this.formInitialize();
    this.disableForm('salon')
    this.disableForm('opentime')
  }
  nextWizard(){
    this.route.navigateByUrl('/positions')
  }
  formInitialize() {
    this.salonDetailForm = this.fb.group({
      address: ['', [Validators.required, Validators.maxLength(300)]],
      city: ['', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z]+$')]],
      country: ['', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z]+$')]],
      zipCode: ['', [Validators.required, Validators.maxLength(15), Validators.pattern('^[0-9]+$')]],
      currency: ['', [Validators.required]],
      phoneNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern('^[0-9]+$')]],
      salonName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    })
    this.openingTimeForm = this.fb.group({
      monOpen: ['', [Validators.required]],
      monClose: ['', [Validators.required]],
      tuesOpen: ['', [Validators.required]],
      tuesClose: ['', [Validators.required]],
      wedOpen: ['', [Validators.required]],
      wedClose: ['', [Validators.required]],
      thursOpen: ['', [Validators.required]],
      thursClose: ['', [Validators.required]],
      friOpen: ['', [Validators.required]],
      friClose: ['', [Validators.required]],
      satOpen: ['', [Validators.required]],
      satClose: ['', [Validators.required]],
      sunOpen: ['', [Validators.required]],
      sunClose: ['', [Validators.required]],
    })
  }
  editSalonDetail(value: any) {
    if (value == 'edit') {
      this.showEditSalonBtn = true
      this.enableForm('salon')
    } else {
      this.showEditSalonBtn = false
      this.disableForm('salon')
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
      this.toastr.success('Salon details saved successfully', '', {
        timeOut: 3000,
      });
    } else {
      this.toastr.error('Please fill all the details', 'Error', {
        timeOut: 3000
      });
    }
  }
  saveTimings() {
    if (this.openingTimeForm.valid) {
      this.toastr.success('Timings saved successfully', '', {
        timeOut: 3000,
      });
    } else {
      this.toastr.error('Please fill all the details', 'Error', {
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
