/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const URL = 'localhost:3002';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: URL,
        package: 'summator',
        protoPath: path.resolve(__dirname, '../../../api/summator.proto'),
      },
    },
  );
  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);
  // const port = process.env.PORT || 3333;
  await app.listen();
  Logger.log(
    `🚀 Application is running on: ${URL}`
  );
}

bootstrap();
