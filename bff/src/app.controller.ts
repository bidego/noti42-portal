import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/health/liveness")
  getLiveness(): string {
    return this.appService.getAlive();
  }

  @Get("/health/readiness")
  getReadiness(): string {
    return this.appService.isReady();
  }

  @Get("/version")
  getVersion(): { version: string } {
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return { version: packageJson.version };
  }
}
