import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClothingTypeService} from "../../../services/clothing-type.service";
import {ClothingType} from "../../../models/clothing-type";

@Component({
  selector: 'app-filter-clothing-type',
  templateUrl: './filter-clothing-type.component.html',
  styleUrls: ['./filter-clothing-type.component.scss']
})
export class FilterClothingTypeComponent implements OnInit{
  @Input() allClothingTypes: string[] = [];
  isClothingTypeCollapsed: boolean = true;
  @Output() clothingTypeFilterChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  selectedClothingTypes: string[] = [];

  constructor(private clothingTypeService: ClothingTypeService) {
  }

  ngOnInit() {
    this.getClothingTypes()
  }

  public getClothingTypes(): void{
    this.clothingTypeService.getClothingTypes().subscribe((response: any[]) => {
      const clothingTypes: ClothingType[] = response
      for (let i = 0; i < clothingTypes.length; i++) {
        this.selectedClothingTypes.push(clothingTypes[i].type)
      }
    })
  }
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

  public toggleClothingTypeCollapse(): void {
    this.isClothingTypeCollapsed = !this.isClothingTypeCollapsed;
  }

  private emitFilterChange(): void {
    this.clothingTypeFilterChange.emit(this.selectedClothingTypes);
  }
}
