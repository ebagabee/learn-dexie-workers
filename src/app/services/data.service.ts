import { Injectable, signal } from '@angular/core';
import { Item } from '../models/item.model';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private worker: Worker;
  private items = signal<Item[]>([]);

  constructor(private db: DatabaseService) {
    // Inicializa o worker
    this.worker = new Worker(
      new URL('../workers/data.worker', import.meta.url)
    );

    // Escuta mensagens do worker
    this.worker.onmessage = ({ data }) => {
      if (data.type === 'ITEMS_PROCESSED') {
        this.items.set(data.items);
      }
    };

    // Carrega itens iniciais
    this.loadItems();
  }

  async loadItems(): Promise<void> {
    const items = await this.db.getAllItems();
    this.items.set(items);

    // Envia para o worker processar
    this.worker.postMessage({ type: 'PROCESS_ITEMS', items });
  }

  async saveItem(item: Item): Promise<void> {
    const newItem: Item = {
      ...item,
      createdAt: new Date(),
    };

    await this.db.addItem(newItem);
    await this.loadItems();
  }

  getItems() {
    return this.items;
  }
}
