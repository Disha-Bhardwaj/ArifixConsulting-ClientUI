import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent implements OnInit {

  addPosition = false
showStep = ''
  constructor() { }

  ngOnInit(): void {
  }
  addPositionBTN(){
    this.addPosition = true
  }
  showStepsFun(showValue: any){
    this.showStep = showValue
  }
}
