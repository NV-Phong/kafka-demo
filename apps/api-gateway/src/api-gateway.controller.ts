import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
  constructor(private readonly kafkaService: ApiGatewayService) {}

  @Get('username/:username')
  findUser(@Param('username') username: string) {
    return this.kafkaService.send('User-Find', username);
  }

  @Delete(':id')
  deleteUser(@Param('id') IDUser: string) {
    return this.kafkaService.send('User-Delete', IDUser);
  }

  @Post()
  createUser(@Body() user: any) {
    return this.kafkaService.send('user_created', user);
  }

  @Post('create')
  createUsers(@Body() user: any) {
    return this.kafkaService.send('User-Create', user);
  }

  @Get('all')
  getAllUsers() {
    return this.kafkaService.send('User-Read', {});
  }

  @Get()
  hello() {
    return this.kafkaService.send('hello', {});
  }
}
