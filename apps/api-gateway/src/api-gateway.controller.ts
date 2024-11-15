import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Client, Transport, ClientKafka } from '@nestjs/microservices';

@Controller()
export class ApiGatewayController {
  constructor(@Inject('KAFKA_CLIENT') private readonly client: ClientKafka) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('user_created');
    this.client.subscribeToResponseOf('hello');
    await this.client.connect();
  }

  @Post()
  createUser(@Body() user: any) {
    return this.client.send('user_created', user);
  }

  @Get()
  hello() {
    return this.client.send('hello', {});
  }
}
