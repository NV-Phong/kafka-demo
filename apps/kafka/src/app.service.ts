import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    var n = 2;
    var a = 3;
    const result = n + a
    return `${result} vail`;
  }
}
