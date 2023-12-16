import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-filter-clothing-type',
  templateUrl: './filter-clothing-type.component.html',
  styleUrls: ['./filter-clothing-type.component.scss']
})
export class FilterClothingTypeComponent {
  @Input() allClothingTypes: string[] = [];
  @Output() clothingTypeFilterChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  selectedClothingTypes: string[] = ["Hoodie", "Shirt", "Pants", "Underwear",
    "Socks", "Shoes", "Jacket", "Hat"];

  public onCheckboxChangeClothingType(product: string): void {
    for (let i = 0; i < this.selectedClothingTypes.length; i++) {
      if (product === this.selectedClothingTypes[i]) {
        this.selectedClothingTypes.splice(i, 1);
        this.emitFilterChange();
        return;
      }
    }
    this.selectedClothingTypes.push(product);
    this.emitFilterChange();
  }

  private emitFilterChange(): void {
    this.clothingTypeFilterChange.emit(this.selectedClothingTypes);
  }
}
