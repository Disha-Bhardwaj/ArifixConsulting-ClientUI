import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  constructor(public dialog: MatDialog, private toastr: ToastrService,
    private cookies: CookieService, private route: Router) { }
  showStep = ''
  details = false
  editDetails=false
  showWizard = false

  ngOnInit(): void {
    if (this.cookies.get('wizardStart') == 'true') {
      this.showWizard = true
    }
  }
  finishWizard(){
    this.cookies.set('wizardStart','false')
    this.showWizard = false
  }
  showStepsFunction(value:any){
    this.showStep = value
  }
  showDetails(){
    this.details = true
  }
  editDetailsFun(){
    this.editDetails = true
  }
  openDialog(value:any) {
    this.dialog.open(DialogComponent, {
      data: {
        fromPage: value,
      },
    });
  }

}
