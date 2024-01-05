import 'dotenv/config';
import './util/alias';

import path from 'path';

import logger from '@logger';
import { CabooseServer } from '@caboose/server';
import { UNIVERSAL } from '@util/universal';

logger.debug("All imports loaded successfully. Starting CabooseWeb...");

let caboose: CabooseServer;
let ready = false;

async function start() {

    UNIVERSAL.CABOOSE_WEB_ENV = process.env.CABOOSE_WEB_ENV ?? "development";
    UNIVERSAL.CABOOSE_WEB_MODE = process.env.CABOOSE_WEB_MODE ?? "external";

    if (UNIVERSAL.CABOOSE_WEB_MODE === "external") {
        logger.info("Welcome to CabooseWeb! Getting things ready...");
    }

    UNIVERSAL.ROOT_DIR = path.resolve(__dirname, '..', '..');
    UNIVERSAL.CONTENT_DIR = path.resolve(UNIVERSAL.ROOT_DIR, 'content');
    UNIVERSAL.DATA_DIR = path.resolve(UNIVERSAL.ROOT_DIR, 'data');

    caboose = new CabooseServer();

    await caboose.start();

    if (UNIVERSAL.CABOOSE_WEB_MODE === "external") {
        logger.info("CabooseWeb is ready! Enjoy!");
    }

    ready = true;
}

start();

export default function getNextRequestHandler() {
    if (!ready) {
        return (req: any, res: any) => {
            res.status(503).json({
                code: 503,
                method: req.method,
                message: `CabooseWeb is not ready yet.`
            });
        }
    }
    return caboose.getNextManager().getNextHandler();
}