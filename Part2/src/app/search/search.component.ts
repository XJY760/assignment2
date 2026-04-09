import { Component } from '@angular/core';
import { InventoryService, InventoryItem } from '../inventory.service';

@Component({
  standalone: false,
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  results: InventoryItem[] = [];

  constructor(private inventoryService: InventoryService) {
    this.showAll();
  }

  search(keyword: string): void {
    this.results = this.inventoryService.searchItems(keyword);
  }

  showAll(): void {
    this.results = this.inventoryService.getItems();
  }

  showPopular(): void {
    this.results = this.inventoryService.getPopularItems();
  }
}