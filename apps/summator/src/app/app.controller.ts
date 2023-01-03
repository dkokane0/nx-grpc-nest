import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  @GrpcMethod('SummatorService', 'Sum')  // localhost:3002  sum method call with message {12,12,12}
  sum(body: { numbers: number[] }): { result: number } {
    return { result: body.numbers.reduce((a, v) => a + v, 0) };
  }
}
