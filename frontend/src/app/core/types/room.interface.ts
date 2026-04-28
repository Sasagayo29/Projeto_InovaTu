export interface Room {
    id?:number
    name: string;
    description: string;
    capacity: number;
}
export interface RoomAvailability {
  roomId: number;
  roomName: string;
  capacity: number;
  availability: AvailabilityDay[];
}

export interface AvailabilityDay {
  date: string;
  morning: string[];
  afternoon: string[];
}

export interface Turno {
    nome: string;
    horarios: string[];
}
