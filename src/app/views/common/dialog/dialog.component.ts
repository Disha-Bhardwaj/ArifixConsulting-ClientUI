import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  sendNewOfferTime() {
    this.toastr.success('Your offer time sent to the salon', '', {
      timeOut: 3000,
    });
  }
}
export interface DialogData {
  fromPage: 'salonPage' | 'calendar' | 'companyInfo' | 'booking' | 'notification' | 'BookOfferTime' | 'Pos1' | 'Pos2' | 'Pos3' | 'Pos4' | 'Pos5' | 'Pos6' | 'Staff1' | 'Staff2';
}
