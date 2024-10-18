import {Routes} from '@angular/router';
import {AvailableRoomsComponent} from './available-rooms/available-rooms.component';
import {CreateReservationComponent} from './create-reservation/create-reservation.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'available-rooms',
    pathMatch: 'full'
  },
  {
    path: 'available-rooms',
    component: AvailableRoomsComponent
  },
  {
    path: 'create-reservation/:roomId',
    component: CreateReservationComponent
  },
  {
    path: '**',
    redirectTo: 'available-rooms'
  }
];
