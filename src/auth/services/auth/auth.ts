import { User } from 'src/typeorm/entities/User';
import { FindUserParams, UserDetails } from 'src/utils/types';

export interface IAuthService {
  validateUser(datails: UserDetails): Promise<User>;
  createUser(details: UserDetails): Promise<User>;
  findUser(params: FindUserParams): Promise<User>;
}
