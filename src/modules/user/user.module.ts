import { Global, Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserClientGrpc } from './user.grpc';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'user.v1',
          protoPath: 'node_modules/@voice-chat/contracts/proto/user.proto',
          url: 'localhost:50501',
        },
      },
    ]),
  ],
  providers: [UserClientGrpc],
  exports: [UserClientGrpc],
})
export class UserModule {}
