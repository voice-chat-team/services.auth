import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_MESSAGE_PATTERNS } from '@voice-chat/contracts';

@Injectable()
export class UserClient {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  getUserByEmail(email: string) {
    return this.userClient.send(USER_MESSAGE_PATTERNS.GET_BY_EMAIL, { email });
  }
}
