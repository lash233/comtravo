import { FlightsController } from "../src/controllers/flights";

describe('FlightsController class', () => {
  test(`should respond with valid API Response, API data should be
  an array of uniques flights with ids or an empty array`,
    async () => {
      const response = await FlightsController.getFlights();

      // valid API responses have at least message and status properties
      expect(
        response.hasOwnProperty('message')
        && typeof response.message === 'string'
      ).toBeTruthy();
      expect(
        response.hasOwnProperty('status')
        && typeof response.status === 'number'
      ).toBeTruthy();

      // valid API Responses have a maximum of 3 keys
      expect(Object.keys(response).length).toBeLessThan(4);

      // if data exist should be an array of unique flights with ids
      if (response.hasOwnProperty('data')) {
        expect(Array.isArray(response.data)).toBeTruthy();

        if (response.data && response.data.length > 0) {
          for (const flight of response.data) {
            expect(
              flight.hasOwnProperty('id')
              && typeof flight.id === 'string'
            ).toBeTruthy();
          }

          // check if dis are uniques
          const ids = response.data.map(flight => flight.id);
          expect(ids.length).toEqual([...new Set(ids)].length);
        }
      }
    })
 });