import { Injectable, Signal, signal } from '@angular/core';
import { Client } from '../../features/client/models/client.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private formSignal = signal<Client>({
    id: 0,
    clientName: '',
    clientNote: '',
    clientType: '',
    lineOfBusiness: '',
  });

  private highlightedItemIdSignal = signal<number>(0);

  constructor() {}

  setHighlightedItemId(itemId: number): void {
    this.highlightedItemIdSignal.set(itemId);
  }

  get highlightedItemId(): Signal<number> {
    return this.highlightedItemIdSignal;
  }

  setFormFields(items: Client): void {
    this.formSignal.set(items);
  }

  get form(): Signal<Client> {
    return this.formSignal;
  }
}
