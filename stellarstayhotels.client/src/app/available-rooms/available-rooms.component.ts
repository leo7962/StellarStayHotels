import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {Room} from '../_models/room';
import {RoomService} from "../_services/room.service";
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-available-rooms',
  templateUrl: './available-rooms.component.html',
  styleUrl: './available-rooms.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AvailableRoomsComponent {
  availableRooms: Room[] = [];
  checkInDate = '';
  checkOutDate = '';
  numberOfGuests = 1;
  private roomService = inject(RoomService)
  private router = inject(Router);

  searchRooms() {
    const searchParams = {
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      numberOfGuests: this.numberOfGuests
    };

    this.roomService.getAvailableRooms(searchParams)
      .subscribe((rooms: Room[]) => {
        this.availableRooms = rooms;
      }, error => {
        console.error('Error fetching available rooms', error);
      });
  }

  selectRoom(room: Room) {
    this.router.navigate(['/create-reservation', room.id], {
      queryParams: {
        checkInDate: this.checkInDate,
        checkOutDate: this.checkOutDate,
        numberOfGuests: this.numberOfGuests
      }
    });
  }
}
