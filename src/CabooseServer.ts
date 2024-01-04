import logger from "@logger";

import { EventEmitter } from 'events';
import { ExpressManager, Manager, RouteManager, SocketManager, NextManager } from "@caboose/managers";
import { EventType } from "@caboose/types";
import { ServerEvents } from "@caboose/events";

export class CabooseServer extends EventEmitter {

    private managers: Manager[];
    private expressManager: ExpressManager;
    private routeManager: RouteManager;
    private socketManager: SocketManager;
    private NextManager: NextManager;

    constructor() {
        super();

        this.expressManager = new ExpressManager(this);
        this.routeManager = new RouteManager(this);
        this.socketManager = new SocketManager(this);
        this.NextManager = new NextManager(this);

        this.managers = [
            this.expressManager,
            this.routeManager,
            this.socketManager,
            this.NextManager
        ];

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
        return this.NextManager;
    }

    public emit(event: EventType, ...args: any[]): boolean {
        logger.silly(`Emitting ${event.toString()}${args.length > 0 ? ` with args ${JSON.stringify(args)}` : ''}`);
        return super.emit(event, ...args);
    }

}

logger.silly("CabooseServer class successfully imported.");