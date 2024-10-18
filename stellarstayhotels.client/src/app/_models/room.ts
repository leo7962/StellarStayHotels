export interface Room {
  id: number;
  type: string;
  maxOccupancy: number;
  numberOfBeds: number;
  hasOceanView: boolean;
  baseRate: number;
}
