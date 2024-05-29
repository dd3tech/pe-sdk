/**
 * Represents an error that occurred during an API request.
 */
class ApiError extends Error {
  public statusCode: number

  /**
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   * @returns {ApiError} - An instance of ApiError
   */
  constructor(message: string, statusCode: number) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
  }

  static createError(message: string, statusCode: number): ApiError {
    switch (statusCode) {
      case 400:
        return new ApiError(`Bad Request: ${message}`, 400)
      case 401:
        return new ApiError(`Unauthorized: ${message}`, 401)
      case 403:
        return new ApiError(`Forbidden: ${message}`, 403)
      case 404:
        return new ApiError(`Not Found: ${message}`, 404)
      case 500:
        return new ApiError(`Internal Server Error: ${message}`, 500)
      default:
        return new ApiError(message, statusCode)
    }
  }
}

export default ApiError
