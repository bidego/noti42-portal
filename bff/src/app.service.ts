import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAlive(): string {
    return 'Alive!';
  }
  isReady(): string {
    return 'Ready!';
  }
}
