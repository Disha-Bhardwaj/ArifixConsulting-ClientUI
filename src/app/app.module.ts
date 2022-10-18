import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { BookingComponent } from './views/components/booking/booking.component';
import { FooterComponent } from './views/common/footer/footer.component';
import { CalendarComponent } from './views/components/calendar/calendar.component';
import { SidebarComponent } from './views/common/sidebar/sidebar.component';
import { CompanyInfoComponent } from './views/components/company-info/company-info.component';
import { DashboardComponent } from './views/components/dashboard/dashboard.component';
import { NotificationsComponent } from './views/components/notifications/notifications.component';
import { PositionsComponent } from './views/components/positions/positions.component';
import { SalonPageComponent } from './views/components/salon-page/salon-page.component';
import { StaffComponent } from './views/components/staff/staff.component'
import { HeaderComponent } from './views/common/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './views/common/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CalendarComponent,
    SidebarComponent,
    CompanyInfoComponent,
    DashboardComponent,
    NotificationsComponent,
    PositionsComponent,
    SalonPageComponent,
    StaffComponent,
    BookingComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
