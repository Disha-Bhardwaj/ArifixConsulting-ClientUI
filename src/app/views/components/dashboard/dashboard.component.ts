import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private cookies: CookieService, private route : Router) { }
  // steps= ''
  // initialBox = true

  ngOnInit(): void {
  }
  start(value:any){
    this.cookies.set('wizardStart','true')
    this.route.navigateByUrl('/company-Info')
  }

}
