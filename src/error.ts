/**
 * Represents an error that occurred during an API request.
 */
class ApiError extends Error {
  /**
   * @param {string} message - Error message
   * @returns {ApiError} - An instance of ApiError
   */
  constructor(message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

export default ApiError
