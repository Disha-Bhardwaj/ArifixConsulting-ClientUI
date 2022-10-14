import { Component, OnInit } from '@angular/core';

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
  constructor() { }

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
