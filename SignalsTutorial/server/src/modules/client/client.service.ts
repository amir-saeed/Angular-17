import { Request, Response } from "express";
import fs from 'fs';
import { Client, LineOfBusiness } from "../../models/connectionParams.interface";

export class ClientService {

    clientFilePath = 'src/data/client.json';
    lobfilePath = 'src/data/lineofbusiness.json';

    addClient = async (req: Request, res: Response) => {
        const clientData: Client = req.body;

        const clients = this.readClientsFromFile(this.clientFilePath);
        const existingClient = this.findClientById(clients, clientData.id);

        if (existingClient) {
            // Update existing client
            Object.assign(existingClient, clientData);
        } else {
            // Add new client
            const maxId = clients.reduce((max, client) => Math.max(max, client.id), 0);
            clientData.id = maxId + 1;
            clients.push(clientData);
        }
        this.writeClientsToFile(clients);
        res.status(200).json({
            message: "Successful",
            data: clientData
        })
    }

    fetchClient = async (req: Request, res: Response) => {
        const clients: Client[] = this.readClientsFromFile(this.clientFilePath);
        res.status(200).json({
            data: clients
        })
        return clients;
    }

    fetchLineOfBusiness = async (req: Request, res: Response) => {
        const lob: LineOfBusiness[] = this.readClientsFromFile(this.lobfilePath);
        res.status(200).json({
            data: lob
        })
        return lob;
    }

    private readClientsFromFile(filePath): any[] {
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading file:', error);
            return [];
        }
    }

    writeClientsToFile(clients: Client[]): void {
        try {
            fs.writeFileSync(this.clientFilePath, JSON.stringify(clients, null, 4));
        } catch (error) {
            console.error('Error writing file:', error);
        }
    }

    findClientById(clients: Client[], id: number): Client | undefined {
        return clients.find(client => client.id === id);
    }

    addOrUpdateClient(clientData: Client): void {
        const clients = this.readClientsFromFile(this.clientFilePath);
        const existingClient = this.findClientById(clients, clientData.id);

        if (existingClient) {
            // Update existing client
            Object.assign(existingClient, clientData);
        } else {
            // Add new client
            const maxId = clients.reduce((max, client) => Math.max(max, client.id), 0);
            clientData.id = maxId + 1;
            clients.push(clientData);
        }

        this.writeClientsToFile(clients);
    }
}