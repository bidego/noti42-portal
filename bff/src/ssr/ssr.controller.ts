import { Controller, Get, Res, Param, NotFoundException, Logger } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

@Controller()
export class SsrController {
  private logger = new Logger('SsrController');
  private readonly templatePath = path.resolve(__dirname, "..","public", "index.html");
  private readonly NOTI_BO_BASE_URL = process.env.NOTI_BO_BASE_URL || 'http://localhost:9000'; // Assuming noti-bo runs on port 9000

  @Get(':categorySlug/:articleSlug')
  async renderArticle(
    @Param('categorySlug') categorySlug: string,
    @Param('articleSlug') articleSlug: string,
    @Res() res: Response,
  ) {
    try {
      this.logger.log(`Rendering article ${categorySlug}/${articleSlug}`);
      const articleApiUrl = `${this.NOTI_BO_BASE_URL}/api/articles/by-category-and-slug/${categorySlug}/${articleSlug}`;
      const articleResponse = await axios.get(articleApiUrl);
      const article = articleResponse.data;

      if (!article) {
        throw new NotFoundException('Article not found');
      }

      let html = fs.readFileSync(this.templatePath, 'utf-8');

      const title = `Noti42 - ${article.title}`;
      const description = article.summary;
      const imageUrl = article.imageUrl;
      const articleUrl = `/${categorySlug}/${articleSlug}`;

      html = html.replace(
        '<title>Noti42 - Noticias en tiempo real</title>',
        `<title>${title}</title>
         <meta name="description" content="${description}" />
         <meta property="og:title" content="${title}" />
         <meta property="og:description" content="${description}" />
         <meta property="og:image" content="${imageUrl}" />
         <meta property="og:url" content="${articleUrl}" />
         <meta property="og:site_name" content="Noti42" />
         <meta property="og:type" content="article" />
        `,
      );

      // You might want to inject pre-rendered React content here if you fully implement SSR
      // For now, we are just injecting meta tags and letting client-side React hydrate

      res.send(html);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).send('Article not found');
      } else {
        console.error('SSR Error:', error);
        res.status(500).send('Internal Server Error');
      }
    }
  }
}
