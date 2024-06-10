import { Module } from '@nestjs/common';

import { CLIENT_SERVICE, envs } from 'src/config';
import { ClientsController } from './clients.controller';
import { Transport, ClientsModule as ClientMS } from '@nestjs/microservices';

@Module({
  controllers: [ClientsController],
  imports: [
    ClientMS.register([
      { 
        name: CLIENT_SERVICE, 
        transport: Transport.TCP,
        options: {
          host: envs.clientesMicroserviceHost,
          port: envs.clientesMicroservicePort,
        }
      },
    ]),
  ]

})
export class ClientsModule {}
