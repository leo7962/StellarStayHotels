import {Room} from "./room";

export interface Reservation {
  id: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  includesBreakfast: boolean;
  totalPrice: number;
  room?: Room;
}
