
// Database function response types
export interface DatabaseFunctionResponse {
  success: boolean;
  message: string;
  action?: string;
}

export interface EventRegistrationResponse extends DatabaseFunctionResponse {}

export interface SavedItemResponse extends DatabaseFunctionResponse {
  action: 'added' | 'removed';
}
