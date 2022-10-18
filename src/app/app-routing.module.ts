import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './views/components/booking/booking.component';
import { CalendarComponent } from './views/components/calendar/calendar.component';
import { CompanyInfoComponent } from './views/components/company-info/company-info.component';
import { DashboardComponent } from './views/components/dashboard/dashboard.component';
import { NotificationsComponent } from './views/components/notifications/notifications.component';
import { PositionsComponent } from './views/components/positions/positions.component';
import { SalonPageComponent } from './views/components/salon-page/salon-page.component';
import { StaffComponent } from './views/components/staff/staff.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'company-Info', component: CompanyInfoComponent },
  { path: 'positions', component: PositionsComponent },
  { path: 'salon-page', component: SalonPageComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'bookings', component: BookingComponent },
  { path: 'calendar', component: CalendarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
