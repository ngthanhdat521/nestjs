import { HttpException } from '@nestjs/common';

export class GlobalHttpException {
  constructor(exception: HttpException) {
    this.overrideProperties(exception);
  }

  /**
   * Output all properties of error object
   * @param exception
   */
  private overrideProperties(exception: HttpException): void {
    const information = JSON.parse(JSON.stringify(exception.getResponse()));

    if (exception.cause) {
      information.description = JSON.stringify(
        exception.cause,
        Object.getOwnPropertyNames(exception.cause),
      );
    }
    for (const key in information) {
      if (Object.prototype.hasOwnProperty.call(information, key)) {
        const element = information[key];
        this[key] = element;
      }
    }
  }
}
