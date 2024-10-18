import { HttpClient } from '@angular/common/http';
import {inject, Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import { Observable } from 'rxjs';
import {Room} from "../_models/room";
import {Reservation} from "../_models/reservation";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;

  getAvailableRooms(searchParams: any): Observable<Room[]> {
    return this.http.post<Room[]>(`${this.baseUrl}/Reservations/available-rooms`, searchParams);
  }

  createReservation(reservation:Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.baseUrl}/Reservations/create`, reservation);
  }
}
