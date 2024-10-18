import {Routes} from '@angular/router';
import {AvailableRoomsComponent} from './available-rooms/available-rooms.component';
import {CreateReservationComponent} from './create-reservation/create-reservation.component';
import {ReservationListComponent} from './reservation-list/reservation-list.component';

export const routes: Routes = [
  {path: '', redirectTo: 'available-rooms', pathMatch: 'full'},
  {path: 'available-rooms', component: AvailableRoomsComponent},
  {path: 'create-reservation/:roomId', component: CreateReservationComponent},
  {path: 'reservations', component: ReservationListComponent},
  {path: '**', redirectTo: 'available-rooms'}
];
