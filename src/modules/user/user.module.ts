import { Global, Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserClient } from './user.client';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 50501,
        },
      },
    ]),
  ],
  providers: [UserClient],
  exports: [UserClient],
})
export class UserModule {}
