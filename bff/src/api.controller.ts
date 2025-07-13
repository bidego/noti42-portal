import { Controller, Get, Req, Res, All } from '@nestjs/common';
import { Request, Response } from 'express';
import axios from 'axios';

@Controller('api')
export class ApiController {
  private readonly NOTI_BO_BASE_URL = 'http://localhost:9000'; // Assuming noti-bo runs on port 9000

  @All('*')
  async proxyAll(@Req() req: Request, @Res() res: Response) {
    const url = `${this.NOTI_BO_BASE_URL}${req.url}`;
    try {
      const response = await axios({
        method: req.method,
        url: url,
        headers: req.headers,
        data: req.body,
      });
      res.status(response.status).send(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Proxy error');
      } else {
        res.status(500).send('Internal server error');
      }
    }
  }
}
