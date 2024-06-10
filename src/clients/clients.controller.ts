import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { CLIENT_SERVICE } from 'src/config';
import { CreateClientDto } from './dto/create-client.dto';

@Controller("clients")
export class ClientsController {
  constructor(
    @Inject(CLIENT_SERVICE) private readonly clientsClient: ClientProxy
  ) { }

  @Get('seed')
  seed() {
    return this.clientsClient.send({ cmd: 'seedClient' }, {});
  }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsClient.send({ cmd: 'createClient' }, createClientDto );
  }

  @Get()
  findAllClients(@Query() paginationDto: PaginationDto) {
    return this.clientsClient.send({ cmd: 'findAllClients' }, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await firstValueFrom(
        this.clientsClient.send({ cmd: 'find_one_client' }, { id })
      );

      return product;

    } catch (error) {
      throw new BadRequestException(error);
    }

  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.clientsClient.send({ cmd: 'removeClient' }, id)
  }

  @Patch(':id')
  udpateProduct(
    @Body() body: any,
    @Param('id') id: string,
  ) {
    return this.clientsClient.send({ cmd: 'find_one_client' }, { id })

  }
}
