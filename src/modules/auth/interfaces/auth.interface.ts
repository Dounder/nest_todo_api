import { UserResponse } from 'src/modules/user';

export interface AuthResponse {
  user: UserResponse;
  message: string;
}
