import { FlightsService } from "../src/services/flights";

describe('FlightsService class', () => {
  test(`should respond with an array of two items,
    these items should be Axios Response object or null values`,
    async () => {
      const response = await FlightsService.getFlights();
      expect(Array.isArray(response)).toBeTruthy();
      expect(response.length).toEqual(2);
      expect((typeof response[0] === 'object') || response[0] === null).toBeTruthy();
      expect((typeof response[1] === 'object') || response[1] === null).toBeTruthy();
    })
 });