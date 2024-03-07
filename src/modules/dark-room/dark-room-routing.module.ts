import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DarkRoomComponent } from './dark-room.component';

const routes: Routes = [{ path: 'dark-room', component: DarkRoomComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DarkRoomRoutingModule { }
