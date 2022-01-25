import { AxiosResponse } from "axios";
import { FlightsService } from "../services/flights"
import { IApiResponse } from "../utils/interfaces/IApiResponse";
import { IFlights } from "../utils/interfaces/Iflights";
import { ResponseBuilder } from "../utils/response-builder";

export class FlightsController {

  /**
   * Gets the flights raw data, merge them, assigns ids and remove duplicates flights,
   * then builds and returns a valid API Response.
   * If something going wrong build and return an API Response with the error
   * @returns API Response with flights listed or pertinent error
   */
  public static async getFlights(): Promise<IApiResponse> {
    try {
      const rawData = await FlightsService.getFlights();
      const allFlights = this.mergeFlightsRawData(rawData);
      const mappedFlights = this.uniqueFlightsWithId(allFlights);
      return new ResponseBuilder()
        .setStatusCodeSuccess()
        .setMessageListed('Flights')
        .setData(mappedFlights)
        .build();
    } catch (error) {
      return new ResponseBuilder()
        .setStatusCodeInternalError()
        .addError(error)
        .build();
    }
  }

  /**
   * Takes an array composed by two arrays of data,
   * checks if each internal array are not null nor undefined and then merge them into a single array
   * @param rawData Array of Axios Responses
   * @returns 
   */
  private static mergeFlightsRawData(rawData: AxiosResponse<any, any>[]): IFlights[]  {
    const allFlights: IFlights[] = [];
    if (rawData[0]) { allFlights.push(...rawData[0].data.flights) }
    if (rawData[1]) { allFlights.push(...rawData[1].data.flights) }
    return allFlights;
  }

  /**
   * Assigns an unique id to each flight object into an array of flights,
   * the ids are assigned using the flight number of each "flight slice"
   * and the departure date time in "Unix time" (milliseconds since 1 January 1970).
   * This method uses the assigned ids to remove duplicates flights
   * @param flights Array of flights (IFlights) without ids
   * @returns Array of flights with ids and without duplicated data.
   * Since flights param could be an empty array, this could returns an empty array
   */
  private static uniqueFlightsWithId(flights: IFlights[]): IFlights[] {
    let i = 0, length = flights.length;
    let ids: string[] = [];
    let mappedFlights: IFlights[] = [];
    while (i < length) {
      const flightNumber1 = flights[i].slices[0].flight_number;
      const flightNumber2 = flights[i].slices[1].flight_number || '0';
      const departure = this.getFligthDepartureTime(flights[i]);
      const id = `${flightNumber1}-${flightNumber2}-${departure}`;
      if (ids.indexOf(id) == -1) {
        ids.push(id);
        mappedFlights.push({
          id,
          ...flights[i]
        })
      }
      i++
    }
    return mappedFlights;
  }

  /**
   * Converts a flight departure time in UTC format to a "unix time" number
   * @param flight Fligth object
   * @returns flight departure time in unix time
   */
  private static getFligthDepartureTime(flight: IFlights): number {
    const departureTimeString = flight.slices[0].departure_date_time_utc;
    let departureTime = new Date(departureTimeString).getTime();
    return departureTime;
  }
}
