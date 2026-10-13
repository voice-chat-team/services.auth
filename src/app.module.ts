import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { secretsConfig } from './config/secrets.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [secretsConfig],
      envFilePath: [`.env.${process.env.NODE_ENV}.local`, '.env'],
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
