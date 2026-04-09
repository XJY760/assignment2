import { Injectable } from '@angular/core';

export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  supplier: string;
  stockStatus: string;
  popular: string;
  comment?: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private items: InventoryItem[] = [];
  private nextId = 1;

  constructor() {
    this.initData();
  }

  private initData(): void {
    this.items = [
      { id: this.nextId++, name: 'MacBook Pro', category: 'Electronics', quantity: 10, price: 1999, supplier: 'Apple', stockStatus: 'In Stock', popular: 'Yes', comment: 'Best seller' },
      { id: this.nextId++, name: 'Office Chair', category: 'Furniture', quantity: 3, price: 299, supplier: 'IKEA', stockStatus: 'Low Stock', popular: 'No' },
      { id: this.nextId++, name: 'Hammer', category: 'Tools', quantity: 0, price: 15, supplier: 'Stanley', stockStatus: 'Out of Stock', popular: 'No' }
    ];
  }

  getItems(): InventoryItem[] {
    return [...this.items];
  }

  getPopularItems(): InventoryItem[] {
    return this.items.filter(item => item.popular === 'Yes');
  }

  addItem(item: Omit<InventoryItem, 'id'>): void {
    const newItem = { ...item, id: this.nextId++ };
    this.items.push(newItem);
  }

  updateItemByName(name: string, updates: Partial<InventoryItem>): boolean {
    const item = this.items.find(i => i.name.toLowerCase() === name.toLowerCase());
    if (item) {
      Object.assign(item, updates);
      return true;
    }
    return false;
  }

  deleteItemByName(name: string): boolean {
    const index = this.items.findIndex(i => i.name.toLowerCase() === name.toLowerCase());
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  searchItems(keyword: string): InventoryItem[] {
    if (!keyword) return this.getItems();
    return this.items.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()));
  }
}