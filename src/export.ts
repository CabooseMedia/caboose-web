import next from "next";
import path from 'path';

const nextApp = next({
    dev: false,
    dir: path.resolve(__dirname, "..")
});

const nextHandler = nextApp.getRequestHandler();

export async function getRequestHandler() {
    await nextApp.prepare();
    return nextHandler;
}