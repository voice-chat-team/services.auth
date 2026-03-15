import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import type {
  GetUserByEmailRequest,
  GetUserByIdRequest,
  UserServiceClient,
} from '@voice-chat/contracts/gen/user';

@Injectable()
export class UserClientGrpc implements OnModuleInit {
  private userServiceClient: UserServiceClient;

  constructor(@Inject('USER_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userServiceClient =
      this.client.getService<UserServiceClient>('UserService');
  }

  getUserByEmail(request: GetUserByEmailRequest) {
    return this.userServiceClient.getUserByEmail(request);
  }

  getUserById(request: GetUserByIdRequest) {
    return this.userServiceClient.getUserById(request);
  }
}
