import { Router } from "express";
import { ClientController } from "./client.controller";

export class ClientRoutes {
    private productController: ClientController;
    public router: Router;

    constructor() {
        this.productController = new ClientController();
        this.router = Router();
        this.initClient();
    }

    private initClient() {
        this.router.get('/', this.productController.fetchClient);
        this.router.get('/lob', this.productController.fetchLineOfBusiness);
        this.router.post('/', this.productController.addClient);
    }
}