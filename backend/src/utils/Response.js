/**
 * A custom class to send consist response in every HTTP request
 * @class Response
 */
class Response {
  /**
   * @param {number} statusCode - HTTP status codes send in response
   * @param {object} data - the data to send in response
   * @param {string} message - the message to associated with the response.
   */
  constructor(statusCode, data, message) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }

  send(res) {
    res.status(this.statusCode).json({
      statusCode: this.statusCode,
      data: this.data,
      message: this.message,
      success: this.success,
    });
  }
}

export { Response };
