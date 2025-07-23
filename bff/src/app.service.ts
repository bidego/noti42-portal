import { Injectable } from '@nestjs/common';

const { join } = require('path');
const { existsSync } = require('fs');

@Injectable()
export class AppService {
  getAlive(): string {
    return 'Alive!';
  }
  isReady(): string {
    // Chequeamos si hay archivos en la carpeta public
    const publicFolder = join(__dirname, '..', 'public');

    if (!existsSync(publicFolder)) {
      return 'Not ready! Missing build artifacts';
    }
    return 'Ready!';
  }
}
