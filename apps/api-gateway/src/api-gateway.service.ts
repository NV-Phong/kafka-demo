import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ApiGatewayService implements OnModuleInit {
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
  send(pattern: string, data: any) {
    return this.client.send(pattern, data);
  }
}
