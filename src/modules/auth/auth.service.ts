import { Injectable } from '@nestjs/common';
import { LoginUserDto } from '@voice-chat/contracts';
import { RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserClientGrpc } from '../user/user.grpc';

@Injectable()
export class AuthService {
  constructor(private readonly userClientGrpc: UserClientGrpc) {}

  async loginUser(dto: LoginUserDto) {
    const { email } = dto;

    const exsistUser = await firstValueFrom(
      this.userClientGrpc.getUserByEmail({ email }),
    );

    if (!exsistUser) throw new RpcException('Пользователь не найден');

    return exsistUser;
  }
}
