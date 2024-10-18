import {HttpClient} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AvailableRoomsComponent} from './available-rooms/available-rooms.component';
import {CreateReservationComponent} from './create-reservation/create-reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    AvailableRoomsComponent,
    CreateReservationComponent,
  ],
  imports: [
    BrowserModule, HttpClient, FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
