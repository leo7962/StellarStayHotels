import {Component, inject, Input, OnInit} from '@angular/core';
import {RoomService} from "../_services/room.service";
import {Room} from "../_models/room";
import {Reservation} from "../_models/reservation";

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrl: './create-reservation.component.scss'
})
export class CreateReservationComponent implements OnInit {
  private roomService = inject(RoomService);
  @Input() selectedRoom: Room | null = null;
  reservationDetails = {
    id: 0,
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
    includesBreakfast: false
  };

  ngOnInit(): void {
    if (this.selectedRoom) {
      this.reservationDetails.id = this.selectedRoom.id;
    }
  }

  createReservation() {
    const reservation: Reservation = {
      ...this.reservationDetails,
      id: 0,
      roomId: 0,
      totalPrice: 0
    };

    this.roomService.createReservation(reservation).subscribe(response => {
      console.log('Reservation successfully created', response);
      alert('Reservation successfully created');
    }, error => {
      console.error('Error creating reservation', error);
      alert('Error creating the reservation. Please try again.');
    })
  }
}
