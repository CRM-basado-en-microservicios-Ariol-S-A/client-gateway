import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { NatsModule } from './transports/nats.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ClientsModule, NatsModule, ProductsModule],
})
export class AppModule {}
