import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AvailableRoomsComponent } from './available-rooms/available-rooms.component';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    AvailableRoomsComponent,
    CreateReservationComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
