import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  await app.listen(process.env.port ?? 3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
