import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {

  infoForm!: FormGroup;
  showEdit = false

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formInitialize();
  }
  formInitialize() {
    this.infoForm = this.fb.group({
      address: [ {value: '', disabled: true},[Validators.required,Validators.maxLength(300)]],
      city: [ {value: '', disabled: true},[Validators.required,Validators.maxLength(30),Validators.pattern('^[a-zA-Z]+$')]],
      county: [ {value: '', disabled: true},[Validators.required,Validators.maxLength(30),Validators.pattern('^[a-zA-Z]+$')]],
      country: [ {value: '', disabled: true},[Validators.required,Validators.maxLength(30),Validators.pattern('^[a-zA-Z]+$')]],
      vatID: [ {value: '', disabled: true},[Validators.required,Validators.maxLength(15),Validators.pattern('^[0-9]+$')]],
      email: [ {value: '', disabled: true},[Validators.required, Validators.email,Validators.minLength(6), Validators.maxLength(60)]],
      regId: [ {value: '', disabled: true},[Validators.required,Validators.maxLength(15),Validators.pattern('^[0-9]+$')]]
    })
  }
  editInfo(){
    this.showEdit = true
  }

}
