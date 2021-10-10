import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/typeorm/entities/User';
import { Done } from 'src/utils/types';
import { IAuthService } from '../services/interfaces/auth';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: IAuthService,
  ) {
    super();
  }
  serializeUser(user: User, done: Done) {
    done(null, user);
  }
  async deserializeUser(user: User, done: Done) {
    const userDB = await this.authService.findUser({
      discordId: user.discordId,
    });
    return userDB ? done(null, userDB) : done(null, null);
  }
}
