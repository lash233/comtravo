import { PROVIDER_PASSWORD, PROVIDER_USERNAME, SOURCE_1, SOURCE_2 } from "../utils/config";
import axios, { AxiosBasicCredentials, AxiosResponse } from 'axios';

export class FlightsService {
  
  /**
   * Establishes communication with our two flights providers,
   * execute both request in parallel.
   *  returns an array with two responses: one per provider.
   * @returns Array with two Axios Response, if a provider request fails its response item is set to 'null'
   */
  public static async getFlights() {
    const auth: AxiosBasicCredentials = {
      username: PROVIDER_USERNAME!,
      password: PROVIDER_PASSWORD!
    }

    const requests: Promise<any>[] = [
      axios.get(SOURCE_1, { auth }),
      axios.get(SOURCE_2, { auth })
    ];

    return Promise.all(requests.map(p => p.catch(() => null)))
      .then((values: AxiosResponse[]) => values);
  }
}