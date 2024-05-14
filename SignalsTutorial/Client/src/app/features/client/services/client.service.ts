import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Client } from '../models/client.model';
import { SharedService } from '../../../shared/services/shared.service';
import { HttpService } from '../../../shared/services/http.service';
import { LineOfBusiness } from '../models/lineOfBusiness.model';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private clientsUrl = 'assets/clients.json';

    constructor(
        private http: HttpClient,
        private sharedService: SharedService,
        private httpService: HttpService) { }

    getClients(): Observable<Client[]> {
        return this.httpService
            .fetchClient()
            .pipe(
                catchError(this.handleError<Client[]>('getClients', []))
            );
    }

    addUpdateClient(client: Client): Observable<Client> {
        return this.httpService.addClient(client)
            .pipe(
                map(response => {
                    const newClient = response?.data;
                    this.sharedService.setHighlightedItemId(newClient?.id);
                    return newClient;
                })
            );
    }

    getLineOfBusiness(): Observable<LineOfBusiness[]> {
        return this.httpService
            .fetchLineOfBusiness()
            .pipe(
                catchError(this.handleError<LineOfBusiness[]>('getClients', []))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}