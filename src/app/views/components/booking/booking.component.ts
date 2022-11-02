import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  expanded: boolean = false;
  editsecond = false
  editthird = false
  editFirst = false
  show = 'all'
  // show = 'pending'
  constructor(public dialog: MatDialog, private toastr: ToastrService) { }
  openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        fromPage: 'booking',
      },
    });
  }
  openDialogOfferTime() {
    this.dialog.open(DialogComponent, {
      data: {
        fromPage: 'BookOfferTime',
      },
    });
  }

  ngOnInit(): void {
  }
  showbooking(value: any) {
    this.show = value
  }
  editFirstBox() {
    this.editFirst = true
  }
  editSecondBox() {
    this.editsecond = true
  }
  editThirdBox() {
    this.editthird = true
  }
  saveFirst() {
    this.editFirst = false
  }
  saveSecond() {
    this.editsecond = false
  }
  saveThird() {
    this.editthird = false
  }
  acceptReject(value: any) {
    if (value == 'accept') {
      this.toastr.success('Booking has been accepted', '', {
        timeOut: 3000,
      });
    }
    else {
      this.toastr.error('Booking has been rejected', '', {
        timeOut: 3000,
      });

    }

  }

}
