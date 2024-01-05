import 'dotenv/config';
import './util/alias';

import path from 'path';

import logger from '@logger';
import { CabooseServer } from '@caboose/server';
import { UNIVERSAL } from '@util/universal';

logger.debug("All imports loaded successfully. Starting Caboose...");

let caboose: CabooseServer;
let ready = false;

async function start() {

    logger.info("Welcome to Caboose! Getting things ready...");

    UNIVERSAL.ROOT_DIR = path.resolve(__dirname, '..', '..');
    UNIVERSAL.CONTENT_DIR = path.resolve(UNIVERSAL.ROOT_DIR, 'content');
    UNIVERSAL.DATA_DIR = path.resolve(UNIVERSAL.ROOT_DIR, 'data');

    caboose = new CabooseServer();

    await caboose.start();

    logger.info("Caboose is ready! Enjoy!");

    ready = true;
}

start();

export default function getNextRequestHandler() {
    if (!ready) {
        return (req: any, res: any) => {
            res.status(503).json({
                code: 503,
                method: req.method,
                message: `Caboose is not ready yet.`
            });
        }
    }
    return caboose.getNextManager().getNextHandler();
}