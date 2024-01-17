import { Manager } from '@caboose/managers';
import logger from "@logger";
import { UNIVERSAL } from '@util/universal';
import { Request, Response } from 'express';
import path from 'path';
import axios from 'axios';

export class RouteManager extends Manager {

    public handleAll(req: Request, res: Response): void {
        let serverHost = process.env.SERVER_URL;
        if (req.path.startsWith('/api')) {
            axios({
                url: `${serverHost}${req.path}`,
                method: req.method,
                data: req.body,
                responseType: 'stream',
                timeout: 5000
            }).then((response) => {
                response.data.pipe(res);
            }).catch((err) => {
                err.response.data.pipe(res);
            });
        } else {
            this.caboose.getNextManager().getNextHandler()(req, res);
        }
    }

    public registerGETRoute(route: string, callback: (req: Request, res: Response) => void): void {
        this.caboose.getExpressManager().getExpressApp().get(route, callback);
        logger.debug(`Registered GET route ${route}.`);
    }

    public registerHEADRoute(route: string, callback: (req: Request, res: Response) => void): void {
        this.caboose.getExpressManager().getExpressApp().head(route, callback);
        logger.debug(`Registered HEAD route ${route}.`);
    }

    public registerPOSTRoute(route: string, callback: (req: Request, res: Response) => void): void {
        this.caboose.getExpressManager().getExpressApp().post(route, callback);
        logger.debug(`Registered POST route ${route}.`);
    }

    public registerPUTRoute(route: string, callback: (req: Request, res: Response) => void): void {
        this.caboose.getExpressManager().getExpressApp().put(route, callback);
        logger.debug(`Registered PUT route ${route}.`);
    }

    public registerDELETERoute(route: string, callback: (req: Request, res: Response) => void): void {
        this.caboose.getExpressManager().getExpressApp().delete(route, callback);
        logger.debug(`Registered DELETE route ${route}.`);
    }

    public registerCONNECTRoute(route: string, callback: (req: Request, res: Response) => void): void {
        this.caboose.getExpressManager().getExpressApp().connect(route, callback);
        logger.debug(`Registered CONNECT route ${route}.`);
    }

    public registerOPTIONSRoute(route: string, callback: (req: Request, res: Response) => void): void {
        this.caboose.getExpressManager().getExpressApp().options(route, callback);
        logger.debug(`Registered OPTIONS route ${route}.`);
    }

    public registerTRACERoute(route: string, callback: (req: Request, res: Response) => void): void {
        this.caboose.getExpressManager().getExpressApp().trace(route, callback);
        logger.debug(`Registered TRACE route ${route}.`);
    }

    public registerPATCHRoute(route: string, callback: (req: Request, res: Response) => void): void {
        this.caboose.getExpressManager().getExpressApp().patch(route, callback);
        logger.debug(`Registered PATCH route ${route}.`);
    }

}