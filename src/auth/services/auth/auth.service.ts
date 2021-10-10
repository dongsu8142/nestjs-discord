import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OAuth2Credentials } from 'src/typeorm/entities/OAuth2Credentials';
import { User } from 'src/typeorm/entities/User';
import {
  FindOAuth2Params,
  FindUserParams,
  OAuth2Details,
  UserDetails,
} from 'src/utils/types';
import { Repository } from 'typeorm';
import { IAuthService } from './auth';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(OAuth2Credentials)
    private readonly oauth2Repository: Repository<OAuth2Credentials>,
  ) {}

  async validateUser(details: UserDetails) {
    const { discordId } = details;
    const user = await this.findUser({ discordId });
    return user ? this.updateUser(details) : this.createUser(details);
  }

  createUser(details: UserDetails) {
    const user = this.userRepository.create(details);
    return this.userRepository.save(user);
  }

  async updateUser(details: UserDetails) {
    await this.userRepository.update(details.discordId, details);
    return details;
  }

  findUser(params: FindUserParams) {
    return this.userRepository.findOne(params);
  }

  async validateOAuth2(details: OAuth2Details) {
    const { discordId } = details;
    const oauth2 = await this.findOAuth2({ discordId });
    return oauth2 ? this.updateOAuth2(details) : this.createOAuth2(details);
  }

  createOAuth2(details: OAuth2Details) {
    const user = this.oauth2Repository.create(details);
    return this.oauth2Repository.save(user);
  }

  async updateOAuth2(details: OAuth2Details) {
    await this.oauth2Repository.update(details.discordId, details);
    return details;
  }

  findOAuth2(params: FindOAuth2Params) {
    return this.oauth2Repository.findOne(params);
  }
}
