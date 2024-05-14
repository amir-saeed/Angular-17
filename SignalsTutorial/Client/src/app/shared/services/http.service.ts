import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from '../../features/client/models/client.model';
import { LineOfBusiness } from '../../features/client/models/lineOfBusiness.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = 'http://localhost:3000/v1/client/';
  private apiLobUrl = `${this.apiUrl}lob`;

  constructor(private http: HttpClient) { }
  fetchClient() {
    return this.http.get<Client[]>(this.apiUrl);
  }

  fetchLineOfBusiness() {
    return this.http.get<LineOfBusiness[]>(this.apiLobUrl);
  }

  addClient(newItem: Client): Observable<any> {
    return this.http.post(this.apiUrl, newItem);
  }

  updateClient(id: number, updatedItem: Client): Observable<Client> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Client>(url, updatedItem);
  }
}