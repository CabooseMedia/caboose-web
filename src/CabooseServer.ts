import logger from "@logger";

import { EventEmitter } from 'events';
import { ExpressManager, Manager, RouteManager, SocketManager, NextManager } from "@caboose/managers";
import { EventType } from "@caboose/types";
import { ServerEvents } from "@caboose/events";
import { UNIVERSAL } from "@util/universal";

export class CabooseServer extends EventEmitter {

    private managers: Manager[];
    private expressManager: ExpressManager;
    private routeManager: RouteManager;
    private socketManager: SocketManager;
    private nextManager: NextManager;

    constructor() {
        super();

        this.expressManager = new ExpressManager(this);
        this.routeManager = new RouteManager(this);
        this.socketManager = new SocketManager(this);
        this.nextManager = new NextManager(this);

        if (UNIVERSAL.CABOOSE_SERVER_MODE == "internal") {
            this.managers = [
                this.nextManager
            ];
        } else {
            this.managers = [
                this.expressManager,
                this.routeManager,
                this.socketManager,
                this.nextManager
            ];
        }

        this.emit(ServerEvents.INITIALIZED);
    }

    public async start(): Promise<void> {
        logger.debug("Starting managers...");
        await this.startManagers();
        this.emit(ServerEvents.READY);
    }
    
    public async startManagers(): Promise<void> {
        const promises = [];
        for (const manager of this.managers) {
            promises.push(manager.start());
        }
        await Promise.all(promises);
    }

    public getExpressManager(): ExpressManager {
        return this.expressManager;
    }

    public getRouteManager(): RouteManager {
        return this.routeManager;
    }

    public getSocketManager(): SocketManager {
        return this.socketManager;
    }

    public getNextManager(): NextManager {
        return this.nextManager;
    }

    public emit(event: EventType, ...args: any[]): boolean {
        logger.silly(`Emitting ${event.toString()}${args.length > 0 ? ` with args ${JSON.stringify(args)}` : ''}`);
        return super.emit(event, ...args);
    }

}

logger.silly("CabooseServer class successfully imported.");