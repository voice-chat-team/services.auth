import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PROTO_PATHS } from '@voice-chat/contracts';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const AUTH_GRPC_URL = configService.getOrThrow<string>('AUTH_GRPC_URL');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'auth.v1',
      protoPath: PROTO_PATHS.AUTH,
      url: AUTH_GRPC_URL,
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
