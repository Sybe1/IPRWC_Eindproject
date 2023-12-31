import {Component, OnInit} from '@angular/core';
import {ClothingTypeService} from "../../../services/clothing-type.service";
import {ClothingType} from "../../../models/clothing-type";
import {PopUpUpdateOrderComponent} from "../../order/pop-up-update-order/pop-up-update-order.component";
import {MatDialog} from "@angular/material/dialog";
import {PopUpUpdateClothingTypeComponent} from "./pop-up-update-clothing-type/pop-up-update-clothing-type.component";

@Component({
  selector: 'app-clothing-type-section',
  templateUrl: './clothing-type-section.component.html',
  styleUrl: './clothing-type-section.component.scss'
})
export class ClothingTypeSectionComponent implements OnInit{
  public clothingTypes: ClothingType[] = [];

  constructor(private clothingTypeService: ClothingTypeService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getClothingTypes()
  }

  public getClothingTypes(): void{
    this.clothingTypeService.getClothingTypes().subscribe((response: any[]) => {
      this.clothingTypes = response
    })
  }

  public deleteClothingType(clothingTypeId: string): void {
    if(confirm('Are you sure you want to delete this clothing type?')) {
      this.clothingTypeService.deleteClothingType(clothingTypeId).subscribe(
        (resp) => {
          console.log(resp)
          this.getClothingTypes();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  public openPopup(code:string, title:string): void{
    const dialogRef = this.dialog.open(PopUpUpdateClothingTypeComponent,{
      width:'18%',
      data: {
        title: title,
        code: code
      }
    });
    dialogRef.componentInstance.onClose.subscribe(() => {
      this.getClothingTypes();
    });
  }
}
