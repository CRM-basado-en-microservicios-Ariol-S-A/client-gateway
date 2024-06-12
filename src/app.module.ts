import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { NatsModule } from './transports/nats.module';

@Module({
  imports: [ClientsModule, NatsModule],
})
export class AppModule {}
