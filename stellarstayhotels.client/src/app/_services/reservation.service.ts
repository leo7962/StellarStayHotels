import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {Reservation} from "../_models/reservation";
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}`);
  }
}
