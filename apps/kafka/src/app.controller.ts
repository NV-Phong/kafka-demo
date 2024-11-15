import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('user_created')
  handleUserCreated(data: Record<string, unknown>) {
    console.log('User Created:', data);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
