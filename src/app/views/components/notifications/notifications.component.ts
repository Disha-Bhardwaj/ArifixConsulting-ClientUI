import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor(public dialog: MatDialog, private toastr: ToastrService, public translateService: TranslateService) { }

  startTime = '';
  finishTime = '';

  ngOnInit(): void {
  }

  timeValue() {
    if (this.startTime.length > 0 && this.finishTime.length > 0) {
      if (this.startTime < this.finishTime) {
        this.toastr.success(this.translateService.instant("ToastMessages.Noti")+' '+ this.startTime + ' '+ this.translateService.instant("ToastMessages.To")+ ' ' + this.finishTime, '', {
          timeOut: 3000,
        });
      } else {
        this.toastr.error(this.translateService.instant("ToastMessages.NotiTime"), this.translateService.instant("ToastMessages.Error"), {
          timeOut: 3000,
        });
      }
    } else {
      this.toastr.error(this.translateService.instant("ToastMessages.NotiTimeError"), this.translateService.instant("ToastMessages.Error"), {
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
