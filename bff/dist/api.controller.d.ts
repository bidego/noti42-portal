import { Request, Response } from 'express';
export declare class ApiController {
    private readonly NOTI_BO_BASE_URL;
    proxyAll(req: Request, res: Response): Promise<void>;
}
