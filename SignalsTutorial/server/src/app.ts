import express, { Application, Request, Response } from "express";
import { config } from './utils/appSettings';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { routes } from "./routes";
import { manageEnvironment } from "./utils/manageEnv";

class App {
    public port = config.port;
    public app: Application;
    constructor() {

        manageEnvironment();

        this.app = express();
        this.app.use(express.json());
        this.app.use(cors({
            credentials: true,
            origin: ["http://localhost:4200"]
        }));

        this.mountRoutes();
    }

    private mountRoutes(): void {
        routes(this.app);
        const swaggerDocument = YAML.load('./swagger.yaml'); // We can use the 'Swagger JSDoc' or 'tsoa' or 'NestJS Swagger' npm package 

        // Swagger setup
        this.app.use(config.routes.swagger, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    public listen() {
        this.app.listen(this.port, async () => {
            console.log('Server is running at port 3000');
        })
    }
}

const app = new App();
app.listen();