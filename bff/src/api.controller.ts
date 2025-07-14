import { Controller, Logger, Req, Res, All } from '@nestjs/common';
import { Request, Response } from 'express';
import axios from 'axios';

@Controller('api')
export class ApiController {
  private logger = new Logger('ApiController');
  // get env variable from .env file
  private readonly NOTI_BO_BASE_URL = process.env.NOTI_BO_BASE_URL || 'http://localhost:9000'; // Assuming noti-bo runs on port 9000

  @All('*')
  async proxyAll(@Req() req: Request, @Res() res: Response) {
    const url = `${this.NOTI_BO_BASE_URL}${req.url}`;
    const filteredHeaders = { ...req.headers };
    delete filteredHeaders['host']; // Remove the original host header
    delete filteredHeaders['connection']; // Remove connection header
    delete filteredHeaders['content-length']; // Remove content-length header
    delete filteredHeaders['transfer-encoding']; // Remove transfer-encoding header

    // Add the desired Host header
    filteredHeaders['Host'] = process.env.NOTI_BO_HOST_HEADER || 'admin.noti42.com';

    const requestBody = ['POST', 'PUT', 'PATCH'].includes(req.method) ? req.body : undefined;

    try {
      const response = await axios({
        method: req.method,
        url: url,
        headers: filteredHeaders,
        data: requestBody,
      });
      res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(`Error proxying request to ${url}: ${error}`);
      if (axios.isAxiosError(error)) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Proxy error');
      } else {
        res.status(500).send('Internal server error');
      }
    }
  }
}
