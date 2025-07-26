import { Module, Logger } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiController } from './api.controller';

const logger = new Logger('AppModule');

import { join } from 'path';
import { SsrController } from './ssr/ssr.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'), 
      serveStaticOptions: {
        setHeaders: (res, path, stat) => {
          if (path.endsWith('.html')) {
            logger.debug(`Path ${path} with no cache`);
            res.setHeader(
              'Cache-Control',
              'no-store, no-cache, must-revalidate, proxy-revalidate',
            );
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
          }
        },
      },
    })
  ],
  controllers: [AppController, ApiController, SsrController ],
  providers: [AppService],
})
export class AppModule {}
