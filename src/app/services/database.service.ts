import Dexie, { Table } from 'dexie';
import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService extends Dexie {
  items!: Table<Item, number>;

  constructor() {
    super('MyDatabase');
    this.version(1).stores({
      items: '++id, name, description, createdAt',
    });
  }

  async addItem(item: Item): Promise<number> {
    return await this.items.add(item);
  }

  async getAllItems(): Promise<Item[]> {
    return await this.items.toArray();
  }
}
