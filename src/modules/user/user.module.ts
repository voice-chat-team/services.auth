import { Global, Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserClientGrpc } from './user.grpc';
import { PROTO_PATHS } from '@voice-chat/contracts';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'user.v1',
          protoPath: PROTO_PATHS.USER,
          url: 'localhost:50501',
        },
      },
    ]),
  ],
  providers: [UserClientGrpc],
  exports: [UserClientGrpc],
})
export class UserModule {}
