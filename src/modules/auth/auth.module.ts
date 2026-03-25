import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '../passport/passport.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PassportModule],
})
export class AuthModule {}
