import { Global, Module } from '@nestjs/common';
import { UserClientGrpc } from './user.grpc';
import { GrpcModule } from '@voice-chat/common';

@Global()
@Module({
  imports: [GrpcModule.register(['USER_PACKAGE'])],
  providers: [UserClientGrpc],
  exports: [UserClientGrpc],
})
export class UserModule {}
