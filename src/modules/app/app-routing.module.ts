import { DarkRoomModule } from './../dark-room/dark-room.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationRoutingModule } from '../registration/registration-routing.module';
import { TemplateComponent } from './template/template.component';
import { LoginRoutingModule } from '../login/login-routing.module';
import { AuthGuard } from 'src/services/authGuard/auth.guard';
import { DarkRoomRoutingModule } from '../dark-room/dark-room-routing.module';

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      { path: 'darkroom', loadChildren: () => import('../dark-room/dark-room.module').then(m => m.DarkRoomModule) },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RegistrationRoutingModule, LoginRoutingModule, DarkRoomRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
