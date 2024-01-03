import {Component, Input} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {PopUpUpdateClothingTypeComponent} from "../pop-up-update-clothing-type/pop-up-update-clothing-type.component";
import {ClothingType} from "../../../../models/clothing-type";
import {OpenPopUpService} from "../../../../services/open-pop-up.service";
import {ClothingTypeService} from "../../../../services/clothing-type.service";
import {ClothingTypeSectionComponent} from "../clothing-type-section.component";

@Component({
  selector: 'app-clothing-type-information',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './clothing-type-information.component.html',
  styleUrl: './clothing-type-information.component.scss'
})
export class ClothingTypeInformationComponent {
  @Input() public clothingType: ClothingType = <ClothingType>{};
  protected readonly PopUpUpdateClothingTypeComponent = PopUpUpdateClothingTypeComponent;

  constructor(private clothingTypeService: ClothingTypeService, public openPupUpService: OpenPopUpService,
              private clothingTypeSectionComponent: ClothingTypeSectionComponent) {
  }

  public deleteClothingType(clothingTypeId: string): void {
    if(confirm('Are you sure you want to delete this clothing type?')) {
      this.clothingTypeService.deleteClothingType(clothingTypeId).subscribe(
        (resp) => {
          console.log(resp)
          this.clothingTypeSectionComponent.getClothingTypes();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
