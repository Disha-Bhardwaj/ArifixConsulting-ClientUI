import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  editsecond= false
  editthird = false
  editFirst = false
   show = 'all'
  // show = 'pending'
  constructor(public dialog: MatDialog) { }
  openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        fromPage: 'booking',
      },
    });
  }
  ngOnInit(): void {
  }
  showbooking(value:any){
      this.show = value
  }
  editFirstBox(){
  this.editFirst = true
  }
  editSecondBox(){
    this.editsecond= true
  }
  editThirdBox(){
  this.editthird = true
  }
  saveFirst(){
    this.editFirst = false
  }
  saveSecond(){
    this.editsecond= false
  }
  saveThird(){
    this.editthird = false
  }

}
