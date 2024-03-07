import { DarkRoomModule } from './../dark-room/dark-room.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationRoutingModule } from '../registration/registration-routing.module';
import { TemplateComponent } from './template/template.component';
import { LoginRoutingModule } from '../login/login-routing.module';
import { AuthGuard } from 'src/services/authGuard/auth.guard';
import { DarkLoginComponent } from '../dark-room/dark-login/dark-login.component';
import { RoomlistComponent } from '../dark-room/roomlist/roomlist.component';
import { AddroomComponent } from '../dark-room/addroom/addroom.component';
import { ChatRoomComponent } from '../dark-room/chatroom/chatroom.component';

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
      { path: '', loadChildren: () => import('../dark-room/dark-room.module').then(m => m.DarkRoomModule) },
    ],
  },
  // { path: '**', redirectTo: '' },
  { path: 'dark-login', component: DarkLoginComponent },
  // { path: 'roomlist/:nickname', component: RoomlistComponent },
  { path: 'roomlist', component: RoomlistComponent },
  { path: 'addroom', component: AddroomComponent },
  { path: 'chatroom/:nickname/:roomid', component: ChatRoomComponent },
  { path: '',
    redirectTo: '/dark-login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RegistrationRoutingModule, LoginRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
