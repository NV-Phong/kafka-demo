import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('user_created')
  handleUserCreated(data: Record<string, unknown>) {
    console.log('User Created:', data);
  }

  @MessagePattern('hello')
  Hello() {
    return this.appService.getHello();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
