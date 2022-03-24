import express from 'express';

export default class App {

    public app: express.Application;
    public port: number;

    constructor(init: { port: number, middlewares: any; controllers: any }) {
        this.app = express();
        this.port = init.port;

        this.middlewares(init.middlewares);
        this.routes(init.controllers);
    }

    // Start the web app with the provided port
    public listen = () => {
        this.app.listen(this.port, () => {
            console.log(`API has started listenting on port ${this.port} \n`);
        });
    }

    // Register the middlewares provided
    private middlewares = (middlewares: any) => {
        middlewares.forEach((middleware: any) => {
            this.app.use(middleware);
        });
    }

    // Register the controllers provided
    private routes = (controllers: any) => {
        controllers.forEach((controller: any) => {
            this.app.use(controller.path, controller.router);
        });
    }
}
