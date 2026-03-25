import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import type {
  RegistrationRequest,
  RegistrationResponse,
  LoginRequest,
  LoginResponse,
  VerifyTokenRequest,
  VerifyTokenResponse,
} from '@voice-chat/contracts/gen/auth';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'Login')
  async login(dto: LoginRequest): Promise<LoginResponse> {
    return await this.authService.loginUser(dto);
  }

  @GrpcMethod('AuthService', 'Registration')
  async registration(dto: RegistrationRequest): Promise<RegistrationResponse> {
    return await this.authService.registrationUser(dto);
  }

  @GrpcMethod('AuthService', 'VerifyToken')
  async verifyToken(dto: VerifyTokenRequest): Promise<VerifyTokenResponse> {
    return await this.authService.verifyToken(dto);
  }
}
