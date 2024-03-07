import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkRoomComponent } from './dark-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from "@angular/material/form-field";
import { DarkLoginComponent } from './dark-login/dark-login.component';
import { RoomlistComponent } from './roomlist/roomlist.component';
import { AddroomComponent } from './addroom/addroom.component';
import { ChatRoomComponent } from './chatroom/chatroom.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    DarkRoomComponent,
    DarkLoginComponent,
    RoomlistComponent,
    AddroomComponent,
    ChatRoomComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTableModule,
    RouterModule
  ]
})
export class DarkRoomModule { }
