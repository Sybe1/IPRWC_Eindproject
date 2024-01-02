import {Component, OnInit} from '@angular/core';
import {ClothingTypeService} from "../../../services/clothing-type.service";
import {ClothingType} from "../../../models/clothing-type";
import {PopUpUpdateOrderComponent} from "../../order/pop-up-update-order/pop-up-update-order.component";
import {MatDialog} from "@angular/material/dialog";
import {PopUpUpdateClothingTypeComponent} from "./pop-up-update-clothing-type/pop-up-update-clothing-type.component";
import {OpenPopUpService} from "../../../services/open-pop-up.service";

@Component({
  selector: 'app-clothing-type-section',
  templateUrl: './clothing-type-section.component.html',
  styleUrl: './clothing-type-section.component.scss'
})
export class ClothingTypeSectionComponent implements OnInit{
  public clothingTypes: ClothingType[] = [];
  protected readonly PopUpUpdateClothingTypeComponent = PopUpUpdateClothingTypeComponent;

  constructor(private clothingTypeService: ClothingTypeService, public openPupUpService: OpenPopUpService) {
  }
  ngOnInit() {
    this.getClothingTypes()
  }

  public getClothingTypes(): void{
    this.clothingTypeService.getClothingTypes().subscribe((response: ClothingType[]) => {
      this.clothingTypes = response
    })
  }
}
