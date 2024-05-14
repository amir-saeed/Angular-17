import { ClientService } from "./client.service";
import { Request, Response } from "express"

export class ClientController {
    private clientService: ClientService;
    constructor() {
        this.clientService = new ClientService();
    }

    fetchClient = async (req: Request, res: Response) => {
        return await this.clientService.fetchClient(req, res);
    }

    fetchLineOfBusiness = async (req: Request, res: Response) => {
        return await this.clientService.fetchLineOfBusiness(req, res);
    }

    addClient = async (req: Request, res: Response) => {
        return await this.clientService.addClient(req, res);
    }
}