import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { Client, Transport, ClientKafka } from '@nestjs/microservices';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      producer: {
        allowAutoTopicCreation: true,
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('user_created');
    await this.client.connect();
  }

  @Post()
  createUser(@Body() user: any) {
    return this.client.send('user_created', user);
  }

  @Get()
  getHello(): string {
    return this.apiGatewayService.getHello();
  }
}
