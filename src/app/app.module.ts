import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { AppComponent } from './app.component';
import { BookingComponent } from './views/components/booking/booking.component';
import { FooterComponent } from './views/common/footer/footer.component';
import { CalendarComponent } from './views/components/calendar/calendar.component';
import { CompanyInfoComponent } from './views/components/company-info/company-info.component';
import { DashboardComponent } from './views/components/dashboard/dashboard.component';
import { NotificationsComponent } from './views/components/notifications/notifications.component';
import { PositionsComponent } from './views/components/positions/positions.component';
import { SalonPageComponent } from './views/components/salon-page/salon-page.component';
import { StaffComponent } from './views/components/staff/staff.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './views/common/dialog/dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatepickerModule } from 'ng2-datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    CalendarComponent,
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
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    DatepickerModule,
    NgxMaterialTimepickerModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}