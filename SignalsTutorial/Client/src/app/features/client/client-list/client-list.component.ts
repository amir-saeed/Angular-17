import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Client } from '../models/client.model';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  columnDefinitions = [
    { key: 'id', header: 'ID' },
    { key: 'clientName', header: 'Client Name' },
    { key: 'clientNote', header: 'Client Note' },
    { key: 'clientType', header: 'Client Type' },
    { key: 'lineOfBusiness', header: 'Line Of Business' }
  ];

  private clientService = inject(ClientService);
  private router = inject(Router);
  private sharedService = inject(SharedService);


  highlightedItemId: number = 0;
  client!: Client;

  constructor() {
    effect(() => {
      this.highlightedItemId = this.sharedService.highlightedItemId();
    });
  }

  ngOnInit(): void {
    this.clientService.getClients()
      .subscribe((data: any) => {
        this.clients = data.data;
      });
  }

  addNewClient() {
    this.sharedService.setFormFields({});
    this.router.navigate(['/client/add']);
  }
}
