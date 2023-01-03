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

  const port  = 'localhost:3001';;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>
  (
    AppModule,
    {
      transport:Transport.GRPC,
      options: {
        url: port,
        package: 'gateway',
        protoPath: path.resolve(__dirname, '../../api/api.proto'),
        loader: {
          includeDirs: [path.resolve(__dirname, '../../')],
        },
      },
    },
  );

  await app.listen();
  // await app.listen();
  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);
  Logger.log(
    `🚀 Application is running on: http://${port}`
  );
}

bootstrap();
