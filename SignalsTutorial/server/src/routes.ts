import { Router } from "express";
import { ClientRoutes } from "./modules/client/client.route";
import { config } from "./utils/appSettings";


export const routes = (router: Router) => {
    let clientRoutes: ClientRoutes = new ClientRoutes();
    // Tour Routes
    router.use(config.routes.client, clientRoutes.router);
}