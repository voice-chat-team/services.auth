import { Module } from '@nestjs/common';
import { PassportService } from './passport.service';
import { JwtModule } from '@nestjs/jwt';
import { getJwtFactory } from './factories';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: getJwtFactory,
      inject: [ConfigService],
    }),
  ],
  providers: [PassportService],
  exports: [PassportService],
})
export class PassportModule {}
