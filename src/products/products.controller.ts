import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config';
import { PaginationDto } from '../common/dto/pagination.dto';
import { firstValueFrom } from 'rxjs';

@Controller('products')
export class ProductsController {

  constructor(

    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy

  ) { }

  @Post()
  createProduct() {
    return "Crea un producto"
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {

    try {
      
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_product' }, { id })
      );

      return product;

    } catch (error) {

      throw new BadRequestException(error);
      
    }


  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return "Elimina el producto " + id
  }

  @Patch(':id')
  udpateProduct(
    @Body() body: any,
    @Param('id') id: string,
  ) {
    return "Actualiza un producto " + id
  }



}
