import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  AUTH_MESSAGE_PATTERNS,
  type LoginUserDto,
} from '@voice-chat/contracts';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AUTH_MESSAGE_PATTERNS.USER_LOGIN)
  login(dto: LoginUserDto) {
    return this.authService.loginUser(dto);
  }
}
