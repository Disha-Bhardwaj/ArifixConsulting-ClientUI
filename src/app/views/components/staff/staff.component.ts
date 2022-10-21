import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  constructor(public dialog: MatDialog, private toastr: ToastrService) { }
  showStep = ''
  details = false
  editDetails=false
  ngOnInit(): void {
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
