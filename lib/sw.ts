import { defaultCache } from "@serwist/next/browser";
import type { PrecacheEntry } from "@serwist/precaching";
import { installSerwist } from "@serwist/sw";

declare const self: ServiceWorkerGlobalScope & {
    // Change this attribute's name to your `injectionPoint`.
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
};

if (process.env.CABOOSE_WEB_ENV === "production") {
    installSerwist({
        precacheEntries: self.__SW_MANIFEST,
        skipWaiting: true,
        clientsClaim: true,
        navigationPreload: true,
        runtimeCaching: defaultCache,
    });
}