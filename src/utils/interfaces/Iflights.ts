export interface IFlights {
  id?: string;
  slices: ISlice[];
  price: number;
}

export interface ISlice {
  origin_name: string;
  destination_name: string;
  departure_date_time_utc: string;
  arrival_date_time_utc: string;
  flight_number: string;
  duration: number;
}