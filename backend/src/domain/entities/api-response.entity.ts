export class ApiResponse<T> {
  private constructor(
    public readonly statusCode: number,
    public readonly message: string,
    public readonly data: T | null,
  ) { }
  static buildResponse<T>(statusCode: number,
    message: string,
    data: T | null = null) {
    return new ApiResponse<T>(statusCode, message, data);
  }
}