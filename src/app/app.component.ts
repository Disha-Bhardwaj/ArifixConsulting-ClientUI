import { Component, ElementRef, ViewChild,AfterViewInit, Renderer2, HostListener } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef,  OnDestroy, Output, EventEmitter} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
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

  private _mobileQueryListener: () => void;
  

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private renderer: Renderer2, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 767px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    if(this.router.url == '\bookings'){
      $('.calendar-container').css('left', '-127px !important')
    }
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit(): void {

    this.renderer.setStyle(this.snav._content.nativeElement,  'scrollbar-width', 'none')
  }
  

}