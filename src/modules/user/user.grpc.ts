import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import type {
  UserServiceClient,
  CreateUserRequest,
  GetUserRequest,
} from '@voice-chat/contracts/gen/user';

@Injectable()
export class UserClientGrpc implements OnModuleInit {
  private userServiceClient: UserServiceClient;

  constructor(@Inject('USER_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userServiceClient =
      this.client.getService<UserServiceClient>('UserService');
  }

  getUser(request: GetUserRequest) {
    return this.userServiceClient.getUser(request);
  }

  createUser(request: CreateUserRequest) {
    return this.userServiceClient.createUser(request);
  }
}
