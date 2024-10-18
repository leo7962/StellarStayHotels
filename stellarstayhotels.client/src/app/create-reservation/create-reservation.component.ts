import {Component, inject, OnInit} from '@angular/core';
import {RoomService} from "../_services/room.service";
import {Room} from "../_models/room";
import {ActivatedRoute} from '@angular/router';
import {Reservation} from "../_models/reservation";
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrl: './create-reservation.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CreateReservationComponent implements OnInit {
  selectedRoom: Room | null = null;
  reservationDetails = {
    roomId: 0,
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
    includesBreakfast: false
  };
  private roomService = inject(RoomService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const roomId = Number(this.route.snapshot.paramMap.get('roomId'));
    this.route.queryParams.subscribe(params => {
      this.reservationDetails = {
        roomId: roomId,
        checkInDate: params['checkInDate'] || '',
        checkOutDate: params['checkOutDate'] || '',
        numberOfGuests: Number(params['numberOfGuests']) || 1,
        includesBreakfast: false
      };
    });

    this.loadRoomDetails(roomId);
  }

  loadRoomDetails(roomId: number) {
    this.roomService.getAvailableRooms({roomId}).subscribe(
      rooms => {
        this.selectedRoom = rooms.find(r => r.id === roomId) || null;
      },
      error => {
        console.error('Error loading room details', error);
      }
    );
  }

  createReservation() {
    const reservation: Reservation = {
      ...this.reservationDetails,
      id: 0, // Ignorado al crear una nueva reserva
      totalPrice: 0 // El backend calculará el precio total
    };

    this.roomService.createReservation(reservation)
      .subscribe(response => {
        console.log('Reserva creada con éxito', response);
        alert('Reserva creada con éxito.');
      }, error => {
        console.error('Error al crear la reserva', error);
        alert('Error al crear la reserva. Por favor, inténtelo de nuevo.');
      });
  }
}
