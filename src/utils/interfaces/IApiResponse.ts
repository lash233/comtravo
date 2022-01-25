export interface IApiResponse {
  message: string;
  status: number;
  data?: any[];
  error?: any;
}