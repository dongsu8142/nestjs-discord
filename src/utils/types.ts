import { User } from 'src/typeorm/entities/User';

export type UserDetails = {
  discordId: string;
  discordTag: string;
  avatar: string;
  email: string;
};

export type FindUserParams = Partial<{
  id: number;
  discordId: string;
  discordTag: string;
  avatar: string;
  email: string;
}>;

export type Done = (err: Error, user: User) => void;
