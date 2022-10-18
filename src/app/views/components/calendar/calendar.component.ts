import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        fromPage: 'calendar',
      },
    });
  }

  ngOnInit(): void {
  }

}
