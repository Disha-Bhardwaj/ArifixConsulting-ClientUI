import { Component, ElementRef, ViewChild,AfterViewInit, Renderer2, HostListener } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef,  OnDestroy, Output, EventEmitter} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('snav')
  snav!: MatSidenav
  isOpenedLang = false
  mobileQuery: MediaQueryList;
  openSidebar = true

  private _mobileQueryListener: () => void;
  
  @ViewChild('menuBtn',  { read: ElementRef })
  private menuBtn!: ElementRef

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private renderer: Renderer2, private router: Router,private cookies: CookieService) {
    this.mobileQuery = media.matchMedia('(max-width: 767px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    // if(this.router.url == '\bookings'){
    //   $('.calendar-container').css('left', '-127px !important')
    // }
    if(this.mobileQuery.matches){
      this.openSidebar = false
    }
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit(): void {
    this.renderer.setStyle(this.snav._content.nativeElement,  'scrollbar-width', 'none')
  }

  removeWizard(){
    this.cookies.set('wizardStart', 'false')
    if(this.mobileQuery.matches){
      this.menuBtn.nativeElement.click()
    }
  }
  openWebsite(){
    window.open('https:/app-reservation-fe-web-frontend.dev.nursi.eu/home','_blank')
  }
  

}