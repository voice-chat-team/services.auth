import { Injectable } from '@nestjs/common';
import type {
  LoginRequest,
  LoginResponse,
} from '@voice-chat/contracts/gen/auth';
import { RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserClientGrpc } from '../user/user.grpc';

@Injectable()
export class AuthService {
  constructor(private readonly userClientGrpc: UserClientGrpc) {}

  async loginUser(dto: LoginRequest): Promise<LoginResponse> {
    const { email } = dto;

    const { user } = await firstValueFrom(
      this.userClientGrpc.getUserByEmail({ email }),
    );

    if (!user)
      throw new RpcException({
        code: 3,
        details: 'Неверный email или пароль',
      });

    return {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
  }
}
