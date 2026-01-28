import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

const PORT = 5001;
const HOST = '127.0.0.1';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: true,
    credentials: true,
  });
  await app.listen(PORT, HOST, () => {
    console.log(`Server started on port http://${HOST}:${PORT}`);
  });
}

bootstrap();
