import {Component, Inject, inject} from '@angular/core';
import { Router } from '@angular/router';
import {Room} from '../_models/room';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {RoomService} from "../_services/room.service";

@Component({
  selector: 'app-available-rooms',
  templateUrl: './available-rooms.component.html',
  styleUrl: './available-rooms.component.scss'
})
export class AvailableRoomsComponent {
  private roomService = inject(RoomService)
  private fb = Inject(FormBuilder);
  private router = inject(Router);
  availableRooms: Room[] = [];
  selectedRoom: Room | null = null;
  showReservationForm: boolean = false;
  searchParams = {
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1
  };

  searchRooms() {
    this.roomService.getAvailableRooms(this.searchParams).subscribe((rooms: Room[]) => {
      this.availableRooms = rooms;
      this.showReservationForm = false;
      this.selectedRoom = null;
    }, error => {
      console.log('Error fetching available rooms', error);
    });
  }

  selectRoom(room: Room) {
    this.selectedRoom = room;
    this.showReservationForm = true;
  }

}
