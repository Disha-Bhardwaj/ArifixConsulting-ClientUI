import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {

  infoForm!: FormGroup;
  showEdit = false
  uploadDoc: any
  showWizard = false
  constructor(private fb: FormBuilder, public dialog: MatDialog, private toastr: ToastrService, 
    private cookies: CookieService, private route: Router, public translateService: TranslateService) { }

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        fromPage: 'companyInfo',
      },
    });
  }
  ngOnInit(): void {
    if (this.cookies.get('wizardStart') == 'true') {
      this.showWizard = true
    }
    this.formInitialize();
  }
  nextWizard(){
    this.route.navigateByUrl('/salon-page')
  }
  finishWizard() {
    this.cookies.set('wizardStart', 'false')
    this.showWizard = false
  }
  formInitialize() {
    this.infoForm = this.fb.group({
      address: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(300)]],
      city: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z]+$')]],
      county: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z]+$')]],
      country: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z]+$')]],
      vatID: [{ value: '', disabled: true }, [Validators.required,Validators.minLength(5), Validators.maxLength(30)]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(60), Validators.pattern('^[a-z0-9A-Z._%+-]+@[a-z0-9A-Z.-]+\\.[a-z]{2,4}$')]],
      regId: [{ value: '', disabled: true }, [Validators.required,Validators.minLength(5), Validators.maxLength(30)]],
      zipCode: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(15), Validators.pattern('^[0-9]+$')]]
    })
  }
  saveInfo() {
    if (this.infoForm.valid) {
      this.toastr.success(this.translateService.instant("ToastMessages.CompanyInfo"), '', {
        timeOut: 3000,
      });
      this.showEdit = false
    for (const control of Object.keys(this.infoForm.controls)) {
      this.infoForm.controls[control].disable()
    }
    } else {
      this.toastr.error(this.translateService.instant("ToastMessages.FillAll"), this.translateService.instant("ToastMessages.Error"), {
        timeOut: 3000
      });
    }

  }
  // validation functions
  get address() {
    return this.infoForm.get('address')!;
  }
  get city() {
    return this.infoForm.get('city')!;
  }
  get country() {
    return this.infoForm.get('country')!;
  }
  get county() {
    return this.infoForm.get('county')!;
  }
  get vatID() {
    return this.infoForm.get('vatID')!;
  }
  get email() {
    return this.infoForm.get('email')!;
  }
  get regId() {
    return this.infoForm.get('regId')!;
  }
  get zipCode() {
    return this.infoForm.get('zipCode')!;
  }

  editInfo() {
    this.showEdit = true
    for (const control of Object.keys(this.infoForm.controls)) {
      this.infoForm.controls[control].enable()
    }
  }
  cancel() {
    this.showEdit = false
    for (const control of Object.keys(this.infoForm.controls)) {
      this.infoForm.controls[control].disable()
    }
    this.infoForm.reset()
  }


}
