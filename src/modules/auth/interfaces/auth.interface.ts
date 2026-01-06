import { UserModel } from 'src/modules/user';

export interface AuthResponse {
  user: UserModel;
  message: string;
}
