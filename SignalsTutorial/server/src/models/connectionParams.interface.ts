export interface Client {
    id?: number;
    clientName: string;
    clientNote: string;
    clientType: string;
    lineOfBusiness: string;
}

export interface LineOfBusiness {
    id: number;
    lineofbusiness: string;
    isactive: boolean;
}