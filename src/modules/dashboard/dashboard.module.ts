import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard.component';
import { AppRoutingModule } from '../app/app-routing.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DashboardComponent],
  imports: [DashboardRoutingModule, NgApexchartsModule, CommonModule],
  providers: [],
})

export class DashboardModule {}
