import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';
@Component({
  selector: 'app-salon-page',
  templateUrl: './salon-page.component.html',
  styleUrls: ['./salon-page.component.scss']
})
export class SalonPageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    // const dialogRef = this.dialog.open(DialogComponent);

    this.dialog.open(DialogComponent, {
      data: {
        fromPage: 'salonPage',
      },
    });
  }
  ngOnInit(): void {
  }

}
