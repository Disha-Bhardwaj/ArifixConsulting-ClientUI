import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { DatepickerOptions } from 'ng2-datepicker';
import { Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  expanded: boolean = false;
  editsecond = false
  editthird = false
  editFirst = false
  show = 'all'
  date: any
  options: DatepickerOptions = {};
  

  constructor(public dialog: MatDialog, private toastr: ToastrService, private router: Router, public translateService: TranslateService) {
  
   }
  
   
  openDialog(value: any) {
    this.expanded = false
    this.dialog.open(DialogComponent, {
      data: {
        fromPage: value,
      },
      autoFocus: false, 
      restoreFocus: false
    });
  }

  ngOnInit(): void {
    this.options= {
      position: undefined,
      placeholder: 'Date',
      format: 'dd/MM/yyyy',
      inputClass: 'dateBookINP',
    };
    
    $('.SelectOpt').css('background-color','#ffffff !important')
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
      this.toastr.success(this.translateService.instant("ToastMessages.BookAccept"), '', {
        timeOut: 3000,
      });
    }
    else {
      this.toastr.error(this.translateService.instant("ToastMessages.BookReject"), '', {
        timeOut: 3000,
      });

    }

  }
  formControlItem: FormControl = new FormControl('');
  // maxTime: DateTime = DateTime.local().set({
  //   hour: 16,
  // });
  // minTime: DateTime = DateTime.local().set({
  //   hour: 14,
  // });
  required: boolean = !1;

  @ViewChild('timepicker') timepicker: any;

  /**
   * Lets the user click on the icon in the input.
   */
  openFromIcon(timepicker: { open: () => void }) {
    if (!this.formControlItem.disabled) {
      timepicker.open();
    }
  }
}
