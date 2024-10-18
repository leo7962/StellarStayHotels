import {CommonModule} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {Reservation} from "../_models/reservation";
import {ReservationService} from "../_services/reservation.service";

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.scss'
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];
  errorMessage: string | null = null;
  private reservationService = inject(ReservationService);

  ngOnInit(): void {
  }

  fetchReservations(): void {
    this.reservationService.getAllReservations().subscribe({
      next: (data: Reservation[]) => {
        this.reservations = data;
        this.errorMessage = null;
      },
      error: (error) => {
        console.error('Error fetching reservations', error);
        this.errorMessage = 'There was a problem loading reservations.';
      }
    });
  }
}
