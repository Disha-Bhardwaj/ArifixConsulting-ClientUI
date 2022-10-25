import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  steps= ''
  initialBox = true

  ngOnInit(): void {
  }
  start(value:any){
    this.initialBox = false
    this.steps = value
  }

}
