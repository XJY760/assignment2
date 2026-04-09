import { Component } from '@angular/core';
import { InventoryService, InventoryItem } from '../inventory.service';

@Component({
  standalone: false,
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {
  items: InventoryItem[] = [];

  newItem = {
    name: '',
    category: 'Electronics',
    quantity: 0,
    price: 0,
    supplier: '',
    stockStatus: 'In Stock',
    popular: 'No' as 'Yes' | 'No',
    comment: ''
  };

  updateName = '';
  updateQuantity: number | null = null;
  updatePrice: number | null = null;

  constructor(private inventoryService: InventoryService) {
    this.refreshItems();
  }

  refreshItems(): void {
    this.items = this.inventoryService.getItems();
  }

  addItem(): void {
    if (!this.newItem.name || !this.newItem.supplier) {
      alert('Name and Supplier are required');
      return;
    }
    if (this.newItem.quantity < 0 || this.newItem.price < 0) {
      alert('Quantity and price must be >= 0');
      return;
    }
    this.inventoryService.addItem(this.newItem);
    this.refreshItems();
    this.resetForm();
  }

  deleteItem(name: string): void {
    if (confirm(`Delete "${name}"?`)) {
      this.inventoryService.deleteItemByName(name);
      this.refreshItems();
    }
  }

  updateItem(): void {
    if (!this.updateName) {
      alert('Enter item name to update');
      return;
    }
    const updates: any = {};
    if (this.updateQuantity !== null) updates.quantity = this.updateQuantity;
    if (this.updatePrice !== null) updates.price = this.updatePrice;
    
    if (this.inventoryService.updateItemByName(this.updateName, updates)) {
      alert('Item updated');
      this.refreshItems();
      this.updateName = '';
      this.updateQuantity = null;
      this.updatePrice = null;
    } else {
      alert('Item not found');
    }
  }

  resetForm(): void {
    this.newItem = {
      name: '',
      category: 'Electronics',
      quantity: 0,
      price: 0,
      supplier: '',
      stockStatus: 'In Stock',
      popular: 'No',
      comment: ''
    };
  }
}