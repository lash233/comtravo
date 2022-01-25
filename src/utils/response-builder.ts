import { IApiResponse } from "./interfaces/IApiResponse";

export class ResponseBuilder {
  private response: IApiResponse = {
    message: 'Request successfully processed',
    status: 200,
  };

  /**
   * Return the new API response
   */
   build(): IApiResponse {
    return this.response;
  }

  /**
   * This method sets the data to the response
   * @param data data to be setted
   */
   setData(data: any): ResponseBuilder {
    this.response.data = data;
    return this;
  }

  /**
   * This method sets a custom message to the response
   * @param message message to be setted
   */
   setMessage(message: string): ResponseBuilder {
    this.response.message = message;
    return this;
  }

  /**
   * sets a default 'successfully listed' message
   * @param detail Entity listed
   */
  setMessageListed(detail = 'Requested data') {
    this.response.message = `${detail} were succesfully listed`
    return this;
  }

  /**
   * This method sets a custom status code.
   */
   setStatusCode(code: number): ResponseBuilder {
    this.response.status = code;
    return this;
  }

  /**
   * sets a 200 status code 
   */
  setStatusCodeSuccess(): ResponseBuilder {
    this.setStatusCode(200);
    return this;
  }

  /**
   * sets a 201 status code
   */
  setStatusCodeCreated(): ResponseBuilder {
    this.setStatusCode(201);
    return this;
  }

  /**
   * sets a 400 status code
   */
  setStatusCodeBadRequestError(): ResponseBuilder {
    this.setStatusCode(400);
    return this;
  }

  /**
   * sets a 408 status code
   */
  setStatusCodeTimeOut(): ResponseBuilder {
    this.setStatusCode(408);
    return this;
  }

  /**
   * sets a 500 status code
   */
  setStatusCodeInternalError(): ResponseBuilder {
    this.setStatusCode(500);
    return this;
  }

  /**
   * This methods adds a new error to the response and sets error message
   */
   addError(error: any): ResponseBuilder {
     this.response.message = error.message ?? error.detail ?? 'Internal server error';
     this.response.error = error;
    return this;
  }
}