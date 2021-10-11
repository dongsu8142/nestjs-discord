import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-discord';
import { Done } from 'src/utils/types';
import { IAuthService } from '../services/interfaces/auth';
import { encrypt } from '../../utils/encrypt';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: IAuthService,
  ) {
    super({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_REDIRECT_URI,
      scope: ['identify', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: Done,
  ) {
    const encryptedAccessToken = encrypt(accessToken).toString();
    const encryptedRefreshToken = encrypt(refreshToken).toString();
    const { id: discordId, email, discriminator, username, avatar } = profile;
    const user = await this.authService.validateUser({
      discordId,
      email,
      discordTag: `${username}#${discriminator}`,
      avatar,
    });
    await this.authService.validateOAuth2({
      discordId,
      accessToken: encryptedAccessToken,
      refreshToken: encryptedRefreshToken,
    });
    done(null, user);
  }
}
