import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor(public dialog: MatDialog, private toastr: ToastrService,) { }

  startTime = '';
  finishTime = '';

  ngOnInit(): void {
  }

  timeValue() {
    if (this.startTime.length > 0 && this.finishTime.length > 0) {
      if (this.startTime < this.finishTime) {
        this.toastr.success('Your notifications are turned off from '+ this.startTime + ' to ' + this.finishTime, '', {
          timeOut: 3000,
        });
      } else {
        this.toastr.error('Finishing time should be greater than Starting time', 'Error', {
          timeOut: 3000,
        });
      }
    } else {
      this.toastr.error('Please enter from and to time', 'Error', {
        timeOut: 3000,
      });
    }
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        fromPage: 'notification',
      },
    });
  }

}
