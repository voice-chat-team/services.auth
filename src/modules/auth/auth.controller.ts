import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import type {
  LoginRequest,
  LoginResponse,
} from '@voice-chat/contracts/gen/auth';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'Login')
  async login(dto: LoginRequest): Promise<LoginResponse> {
    return await this.authService.loginUser(dto);
  }
}
