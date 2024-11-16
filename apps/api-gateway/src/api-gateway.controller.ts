import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { Client, Transport, ClientKafka } from '@nestjs/microservices';

@Controller()
export class ApiGatewayController {
  constructor(@Inject('KAFKA_CLIENT') private readonly client: ClientKafka) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('user_created');
    this.client.subscribeToResponseOf('hello');
    this.client.subscribeToResponseOf('User-Read');
    this.client.subscribeToResponseOf('User-Create');
    this.client.subscribeToResponseOf('User-Delete');
    this.client.subscribeToResponseOf('User-Find');
    await this.client.connect();
  }

  @Get('username/:username')
  findUser(@Param('username') username: string) {
    return this.client.send('User-Find', username);
  }

  @Delete(':id')
  deleteUser(@Param('id') IDUser: string) {
    return this.client.send('User-Delete', IDUser);
  }

  @Post()
  createUser(@Body() user: any) {
    return this.client.send('user_created', user);
  }

  @Post('create')
  createUsers(@Body() user: any) {
    return this.client.send('User-Create', user);
  }

  @Get('all')
  getAllUsers() {
    return this.client.send('User-Read', {});
  }

  @Get()
  hello() {
    return this.client.send('hello', {});
  }
}
