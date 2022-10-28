import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private cookies: CookieService,) { }

  ngOnInit(): void {
  }
  removeWizard(){
    this.cookies.set('wizardStart', 'false')
  }
}
