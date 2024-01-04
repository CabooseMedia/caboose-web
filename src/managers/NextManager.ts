import { Manager } from '@caboose/managers';
import logger from "@logger";
import { UNIVERSAL } from '@util/universal';
import { Request, Response } from 'express';
import next from 'next';
import { NextServer, RequestHandler } from 'next/dist/server/next';

export class NextManager extends Manager {

    protected nextApp!: NextServer;
    protected nextHandler!: RequestHandler;

    public initialize(): void {
        this.nextApp = next({
            dev: process.env.CABOOSE_WEB_ENV === 'development',
            dir: "../../app"
        });
        this.nextHandler = this.nextApp.getRequestHandler();
    }
    
    
    public async onStart(): Promise<void> {
        await this.nextApp.prepare();
    }

    public getNextHandler(): RequestHandler {
        return this.nextHandler;
    }

}